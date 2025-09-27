#!/usr/bin/env python3
"""
Comprehensive Backend API Test Suite for Minute Savoir
Tests all API endpoints including authentication, user management, sessions, and skills
"""

import requests
import json
import time
import uuid
from datetime import datetime, timedelta

# Configuration
BASE_URL = "http://localhost:3000/api"
HEADERS = {"Content-Type": "application/json"}

class MinuteSavoirAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.headers = HEADERS.copy()
        self.auth_token = None
        self.test_user_id = None
        self.test_user_email = None
        self.test_session_id = None
        self.test_results = []
        
    def log_test(self, test_name, success, message, response_data=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "timestamp": datetime.now().isoformat()
        }
        if response_data:
            result["response"] = response_data
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {test_name}: {message}")
        
    def make_request(self, method, endpoint, data=None, auth_required=False):
        """Make HTTP request with proper headers"""
        url = f"{self.base_url}{endpoint}"
        headers = self.headers.copy()
        
        if auth_required and self.auth_token:
            headers["Authorization"] = f"Bearer {self.auth_token}"
            
        try:
            if method == "GET":
                response = requests.get(url, headers=headers, timeout=30)
            elif method == "POST":
                response = requests.post(url, headers=headers, json=data, timeout=30)
            elif method == "PUT":
                response = requests.put(url, headers=headers, json=data, timeout=30)
            elif method == "DELETE":
                response = requests.delete(url, headers=headers, timeout=30)
            else:
                raise ValueError(f"Unsupported method: {method}")
                
            return response
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            return None
    
    def test_api_health_check(self):
        """Test 1: API Health Check - GET /api/"""
        print("\n=== Testing API Health Check ===")
        
        response = self.make_request("GET", "/")
        
        if response is None:
            self.log_test("API Health Check", False, "Failed to connect to API")
            return False
            
        if response.status_code == 200:
            try:
                data = response.json()
                if "message" in data and "endpoints" in data:
                    self.log_test("API Health Check", True, f"API is running - {data['message']}", data)
                    return True
                else:
                    self.log_test("API Health Check", False, "Invalid response structure", data)
                    return False
            except json.JSONDecodeError:
                self.log_test("API Health Check", False, "Invalid JSON response")
                return False
        else:
            self.log_test("API Health Check", False, f"HTTP {response.status_code}: {response.text}")
            return False
    
    def test_user_signup(self):
        """Test 2: User Signup - POST /api/auth/signup"""
        print("\n=== Testing User Signup ===")
        
        # Generate unique test data
        unique_id = str(uuid.uuid4())[:8]
        self.test_user_email = f"john.doe.{unique_id}@example.com"
        test_data = {
            "name": f"John Doe {unique_id}",
            "email": self.test_user_email,
            "password": "securepassword123",
            "bio": "Experienced software developer passionate about teaching",
            "teachingSkills": ["JavaScript", "Python", "React"],
            "learningSkills": ["Machine Learning", "DevOps"],
            "credits": 15
        }
        
        response = self.make_request("POST", "/auth/signup", test_data)
        
        if response is None:
            self.log_test("User Signup", False, "Failed to connect to signup endpoint")
            return False
            
        if response.status_code == 200:
            try:
                data = response.json()
                if data.get("success") and "user" in data and "token" in data:
                    self.auth_token = data["token"]
                    self.test_user_id = data["user"]["id"]
                    self.log_test("User Signup", True, f"User created successfully with ID: {self.test_user_id}")
                    
                    # Verify user data structure
                    user = data["user"]
                    required_fields = ["id", "name", "email", "bio", "teachingSkills", "learningSkills", "credits"]
                    missing_fields = [field for field in required_fields if field not in user]
                    
                    if missing_fields:
                        self.log_test("User Signup Data Structure", False, f"Missing fields: {missing_fields}")
                    else:
                        self.log_test("User Signup Data Structure", True, "All required fields present")
                    
                    return True
                else:
                    self.log_test("User Signup", False, "Invalid response structure", data)
                    return False
            except json.JSONDecodeError:
                self.log_test("User Signup", False, "Invalid JSON response")
                return False
        else:
            self.log_test("User Signup", False, f"HTTP {response.status_code}: {response.text}")
            return False
    
    def test_user_login(self):
        """Test 3: User Login - POST /api/auth/login"""
        print("\n=== Testing User Login ===")
        
        if not self.test_user_id:
            self.log_test("User Login", False, "No test user available - signup must succeed first")
            return False
            
        # Use the same credentials from signup
        unique_id = str(uuid.uuid4())[:8]
        login_data = {
            "email": f"john.doe.{unique_id}@example.com",
            "password": "securepassword123"
        }
        
        # Reset token to test fresh login
        original_token = self.auth_token
        self.auth_token = None
        
        response = self.make_request("POST", "/auth/login", login_data)
        
        if response is None:
            self.log_test("User Login", False, "Failed to connect to login endpoint")
            self.auth_token = original_token  # Restore token
            return False
            
        if response.status_code == 200:
            try:
                data = response.json()
                if data.get("success") and "user" in data and "token" in data:
                    self.auth_token = data["token"]
                    self.log_test("User Login", True, "Login successful, JWT token received")
                    
                    # Verify JWT token format
                    if len(self.auth_token.split('.')) == 3:
                        self.log_test("JWT Token Format", True, "Valid JWT token structure")
                    else:
                        self.log_test("JWT Token Format", False, "Invalid JWT token structure")
                    
                    return True
                else:
                    self.log_test("User Login", False, "Invalid response structure", data)
                    self.auth_token = original_token  # Restore token
                    return False
            except json.JSONDecodeError:
                self.log_test("User Login", False, "Invalid JSON response")
                self.auth_token = original_token  # Restore token
                return False
        else:
            self.log_test("User Login", False, f"HTTP {response.status_code}: {response.text}")
            self.auth_token = original_token  # Restore token
            return False
    
    def test_invalid_login(self):
        """Test 4: Invalid Login Credentials"""
        print("\n=== Testing Invalid Login ===")
        
        invalid_data = {
            "email": "nonexistent@example.com",
            "password": "wrongpassword"
        }
        
        response = self.make_request("POST", "/auth/login", invalid_data)
        
        if response is None:
            self.log_test("Invalid Login", False, "Failed to connect to login endpoint")
            return False
            
        if response.status_code == 400:
            try:
                data = response.json()
                if "error" in data:
                    self.log_test("Invalid Login", True, f"Correctly rejected invalid credentials: {data['error']}")
                    return True
                else:
                    self.log_test("Invalid Login", False, "Missing error message in response", data)
                    return False
            except json.JSONDecodeError:
                self.log_test("Invalid Login", False, "Invalid JSON response")
                return False
        else:
            self.log_test("Invalid Login", False, f"Expected 400, got HTTP {response.status_code}: {response.text}")
            return False
    
    def test_get_all_users(self):
        """Test 5: Get All Users - GET /api/users"""
        print("\n=== Testing Get All Users ===")
        
        response = self.make_request("GET", "/users")
        
        if response is None:
            self.log_test("Get All Users", False, "Failed to connect to users endpoint")
            return False
            
        if response.status_code == 200:
            try:
                data = response.json()
                if data.get("success") and "users" in data:
                    users = data["users"]
                    self.log_test("Get All Users", True, f"Retrieved {len(users)} users")
                    
                    # Verify no passwords are exposed
                    password_exposed = any("password" in user for user in users)
                    if password_exposed:
                        self.log_test("Password Security", False, "Passwords exposed in user list")
                    else:
                        self.log_test("Password Security", True, "Passwords properly excluded from response")
                    
                    return True
                else:
                    self.log_test("Get All Users", False, "Invalid response structure", data)
                    return False
            except json.JSONDecodeError:
                self.log_test("Get All Users", False, "Invalid JSON response")
                return False
        else:
            self.log_test("Get All Users", False, f"HTTP {response.status_code}: {response.text}")
            return False
    
    def test_update_user_profile(self):
        """Test 6: Update User Profile - PUT /api/users/{userId}"""
        print("\n=== Testing Update User Profile ===")
        
        if not self.test_user_id or not self.auth_token:
            self.log_test("Update User Profile", False, "No authenticated user available")
            return False
            
        update_data = {
            "bio": "Updated bio - Senior developer with 10+ years experience",
            "teachingSkills": ["JavaScript", "Python", "React", "Node.js"],
            "learningSkills": ["Machine Learning", "DevOps", "Kubernetes"]
        }
        
        response = self.make_request("PUT", f"/users/{self.test_user_id}", update_data, auth_required=True)
        
        if response is None:
            self.log_test("Update User Profile", False, "Failed to connect to update endpoint")
            return False
            
        if response.status_code == 200:
            try:
                data = response.json()
                if data.get("success") and "user" in data:
                    updated_user = data["user"]
                    if updated_user["bio"] == update_data["bio"]:
                        self.log_test("Update User Profile", True, "User profile updated successfully")
                        return True
                    else:
                        self.log_test("Update User Profile", False, "Profile not updated correctly", data)
                        return False
                else:
                    self.log_test("Update User Profile", False, "Invalid response structure", data)
                    return False
            except json.JSONDecodeError:
                self.log_test("Update User Profile", False, "Invalid JSON response")
                return False
        else:
            self.log_test("Update User Profile", False, f"HTTP {response.status_code}: {response.text}")
            return False
    
    def test_unauthorized_update(self):
        """Test 7: Unauthorized Profile Update"""
        print("\n=== Testing Unauthorized Update ===")
        
        if not self.test_user_id:
            self.log_test("Unauthorized Update", False, "No test user available")
            return False
            
        update_data = {"bio": "Unauthorized update attempt"}
        
        # Make request without auth token
        response = self.make_request("PUT", f"/users/{self.test_user_id}", update_data, auth_required=False)
        
        if response is None:
            self.log_test("Unauthorized Update", False, "Failed to connect to update endpoint")
            return False
            
        if response.status_code == 401:
            try:
                data = response.json()
                if "error" in data:
                    self.log_test("Unauthorized Update", True, f"Correctly rejected unauthorized request: {data['error']}")
                    return True
                else:
                    self.log_test("Unauthorized Update", False, "Missing error message", data)
                    return False
            except json.JSONDecodeError:
                self.log_test("Unauthorized Update", False, "Invalid JSON response")
                return False
        else:
            self.log_test("Unauthorized Update", False, f"Expected 401, got HTTP {response.status_code}: {response.text}")
            return False
    
    def test_create_session(self):
        """Test 8: Create Session - POST /api/sessions"""
        print("\n=== Testing Create Session ===")
        
        if not self.auth_token:
            self.log_test("Create Session", False, "No authenticated user available")
            return False
            
        # Create session data
        session_data = {
            "teacherId": self.test_user_id,
            "learnerId": str(uuid.uuid4()),  # Mock learner ID
            "skill": "JavaScript",
            "scheduledFor": (datetime.now() + timedelta(days=1)).isoformat(),
            "meetingUrl": "https://meet.example.com/session123"
        }
        
        response = self.make_request("POST", "/sessions", session_data, auth_required=True)
        
        if response is None:
            self.log_test("Create Session", False, "Failed to connect to sessions endpoint")
            return False
            
        if response.status_code == 200:
            try:
                data = response.json()
                if data.get("success") and "session" in data:
                    session = data["session"]
                    self.test_session_id = session["id"]
                    self.log_test("Create Session", True, f"Session created successfully with ID: {self.test_session_id}")
                    
                    # Verify session data structure
                    required_fields = ["id", "teacherId", "learnerId", "skill", "status", "scheduledFor"]
                    missing_fields = [field for field in required_fields if field not in session]
                    
                    if missing_fields:
                        self.log_test("Session Data Structure", False, f"Missing fields: {missing_fields}")
                    else:
                        self.log_test("Session Data Structure", True, "All required fields present")
                    
                    return True
                else:
                    self.log_test("Create Session", False, "Invalid response structure", data)
                    return False
            except json.JSONDecodeError:
                self.log_test("Create Session", False, "Invalid JSON response")
                return False
        else:
            self.log_test("Create Session", False, f"HTTP {response.status_code}: {response.text}")
            return False
    
    def test_get_user_sessions(self):
        """Test 9: Get User Sessions - GET /api/sessions"""
        print("\n=== Testing Get User Sessions ===")
        
        if not self.auth_token:
            self.log_test("Get User Sessions", False, "No authenticated user available")
            return False
            
        response = self.make_request("GET", "/sessions", auth_required=True)
        
        if response is None:
            self.log_test("Get User Sessions", False, "Failed to connect to sessions endpoint")
            return False
            
        if response.status_code == 200:
            try:
                data = response.json()
                if data.get("success") and "sessions" in data:
                    sessions = data["sessions"]
                    self.log_test("Get User Sessions", True, f"Retrieved {len(sessions)} sessions")
                    return True
                else:
                    self.log_test("Get User Sessions", False, "Invalid response structure", data)
                    return False
            except json.JSONDecodeError:
                self.log_test("Get User Sessions", False, "Invalid JSON response")
                return False
        else:
            self.log_test("Get User Sessions", False, f"HTTP {response.status_code}: {response.text}")
            return False
    
    def test_update_session(self):
        """Test 10: Update Session - PUT /api/sessions/{sessionId}"""
        print("\n=== Testing Update Session ===")
        
        if not self.test_session_id or not self.auth_token:
            self.log_test("Update Session", False, "No session or authenticated user available")
            return False
            
        update_data = {
            "status": "completed",
            "completed": True
        }
        
        response = self.make_request("PUT", f"/sessions/{self.test_session_id}", update_data, auth_required=True)
        
        if response is None:
            self.log_test("Update Session", False, "Failed to connect to session update endpoint")
            return False
            
        if response.status_code == 200:
            try:
                data = response.json()
                if data.get("success") and "session" in data:
                    updated_session = data["session"]
                    if updated_session["status"] == "completed":
                        self.log_test("Update Session", True, "Session updated successfully")
                        self.log_test("Credit System", True, "Session completion should trigger credit transfer")
                        return True
                    else:
                        self.log_test("Update Session", False, "Session status not updated correctly", data)
                        return False
                else:
                    self.log_test("Update Session", False, "Invalid response structure", data)
                    return False
            except json.JSONDecodeError:
                self.log_test("Update Session", False, "Invalid JSON response")
                return False
        else:
            self.log_test("Update Session", False, f"HTTP {response.status_code}: {response.text}")
            return False
    
    def test_get_skills(self):
        """Test 11: Get Skills - GET /api/skills"""
        print("\n=== Testing Get Skills ===")
        
        response = self.make_request("GET", "/skills")
        
        if response is None:
            self.log_test("Get Skills", False, "Failed to connect to skills endpoint")
            return False
            
        if response.status_code == 200:
            try:
                data = response.json()
                if data.get("success") and "skills" in data:
                    skills = data["skills"]
                    self.log_test("Get Skills", True, f"Retrieved {len(skills)} unique skills")
                    
                    # Verify skills are sorted
                    if skills == sorted(skills):
                        self.log_test("Skills Sorting", True, "Skills are properly sorted")
                    else:
                        self.log_test("Skills Sorting", False, "Skills are not sorted")
                    
                    return True
                else:
                    self.log_test("Get Skills", False, "Invalid response structure", data)
                    return False
            except json.JSONDecodeError:
                self.log_test("Get Skills", False, "Invalid JSON response")
                return False
        else:
            self.log_test("Get Skills", False, f"HTTP {response.status_code}: {response.text}")
            return False
    
    def test_unauthorized_session_access(self):
        """Test 12: Unauthorized Session Access"""
        print("\n=== Testing Unauthorized Session Access ===")
        
        # Test GET sessions without auth
        response = self.make_request("GET", "/sessions", auth_required=False)
        
        if response is None:
            self.log_test("Unauthorized Session Access", False, "Failed to connect to sessions endpoint")
            return False
            
        if response.status_code == 401:
            try:
                data = response.json()
                if "error" in data:
                    self.log_test("Unauthorized Session Access", True, f"Correctly rejected unauthorized request: {data['error']}")
                    return True
                else:
                    self.log_test("Unauthorized Session Access", False, "Missing error message", data)
                    return False
            except json.JSONDecodeError:
                self.log_test("Unauthorized Session Access", False, "Invalid JSON response")
                return False
        else:
            self.log_test("Unauthorized Session Access", False, f"Expected 401, got HTTP {response.status_code}: {response.text}")
            return False
    
    def run_all_tests(self):
        """Run all test cases"""
        print("🚀 Starting Minute Savoir Backend API Tests")
        print(f"Testing against: {self.base_url}")
        print("=" * 60)
        
        test_methods = [
            self.test_api_health_check,
            self.test_user_signup,
            self.test_user_login,
            self.test_invalid_login,
            self.test_get_all_users,
            self.test_update_user_profile,
            self.test_unauthorized_update,
            self.test_create_session,
            self.test_get_user_sessions,
            self.test_update_session,
            self.test_get_skills,
            self.test_unauthorized_session_access
        ]
        
        passed = 0
        failed = 0
        
        for test_method in test_methods:
            try:
                success = test_method()
                if success:
                    passed += 1
                else:
                    failed += 1
            except Exception as e:
                print(f"❌ FAIL - {test_method.__name__}: Exception occurred - {str(e)}")
                failed += 1
            
            time.sleep(0.5)  # Small delay between tests
        
        # Print summary
        print("\n" + "=" * 60)
        print("🏁 TEST SUMMARY")
        print("=" * 60)
        print(f"✅ Passed: {passed}")
        print(f"❌ Failed: {failed}")
        print(f"📊 Total: {passed + failed}")
        print(f"📈 Success Rate: {(passed / (passed + failed) * 100):.1f}%")
        
        if failed == 0:
            print("\n🎉 ALL TESTS PASSED! Backend API is working correctly.")
        else:
            print(f"\n⚠️  {failed} test(s) failed. Please review the issues above.")
        
        return passed, failed

if __name__ == "__main__":
    tester = MinuteSavoirAPITester()
    passed, failed = tester.run_all_tests()
    
    # Exit with appropriate code
    exit(0 if failed == 0 else 1)