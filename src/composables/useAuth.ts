import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
// Temporarily commented out for mocking
// import {
//   CognitoUserPool,
//   CognitoUser,
//   AuthenticationDetails,
//   CognitoUserSession,
// } from 'amazon-cognito-identity-js'

// Environment variables - can be set in .env file
// const USER_POOL_ID = import.meta.env.VITE_USER_POOL_ID || 'us-east-1_w7n9ZA77r'
// const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || '2eqao6ibvujcm3ra05avg5adfb'

// Temporarily commented out for mocking
// const userPool = new CognitoUserPool({
//   UserPoolId: USER_POOL_ID,
//   ClientId: CLIENT_ID,
// })

// State (similar to useState in React)
const isAuthenticated = ref<boolean>(false)
const isLoading = ref<boolean>(true)
const user = ref<Record<string, string> | null>(null)
const tokens = ref<{
  accessToken: string
  idToken: string
  refreshToken: string
} | null>(null)

// Computed properties
const isAuth = computed(() => isAuthenticated.value)
const loading = computed(() => isLoading.value)
const currentUser = computed(() => user.value)

// Check for existing session - MOCKED FOR NOW
const checkSession = async (): Promise<void> => {
  // Mock: Check localStorage for existing session
  try {
    const storedUser = localStorage.getItem('mock_user')
    const storedTokens = localStorage.getItem('mock_tokens')
    
    if (storedUser && storedTokens) {
      isAuthenticated.value = true
      user.value = JSON.parse(storedUser)
      tokens.value = JSON.parse(storedTokens)
    } else {
      isAuthenticated.value = false
      tokens.value = null
      user.value = null
    }
  } catch (error) {
    console.error('Error checking session:', error)
    isAuthenticated.value = false
    tokens.value = null
    user.value = null
  } finally {
    isLoading.value = false
  }

  // ORIGINAL COGNITO CODE - COMMENTED OUT FOR MOCKING
  // try {
  //   const cognitoUser = userPool.getCurrentUser()
  //   if (cognitoUser) {
  //     cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
  //       if (err || !session || !session.isValid()) {
  //         isAuthenticated.value = false
  //         tokens.value = null
  //         user.value = null
  //         isLoading.value = false
  //         return
  //       }
  //
  //       isAuthenticated.value = true
  //       tokens.value = {
  //         accessToken: session.getAccessToken().getJwtToken(),
  //         idToken: session.getIdToken().getJwtToken(),
  //         refreshToken: session.getRefreshToken().getToken(),
  //       }
  //
  //       cognitoUser.getUserAttributes((err, attributes) => {
  //         if (err) {
  //           console.error('Error getting user attributes:', err)
  //           user.value = { email: cognitoUser.getUsername() }
  //         } else {
  //           const userAttrs: Record<string, string> = {}
  //           attributes?.forEach((attr) => {
  //             userAttrs[attr.Name] = attr.Value
  //           })
  //           user.value = userAttrs
  //         }
  //         isLoading.value = false
  //       })
  //     })
  //   } else {
  //     isAuthenticated.value = false
  //     tokens.value = null
  //     user.value = null
  //     isLoading.value = false
  //   }
  // } catch (error) {
  //   console.error('Error checking session:', error)
  //   isAuthenticated.value = false
  //   tokens.value = null
  //   user.value = null
  //   isLoading.value = false
  // }
}

// Login function - MOCKED FOR NOW (always succeeds)
const login = async (username: string, password: string): Promise<void> => {
  // Mock: Always return success
  return new Promise((resolve) => {
    // Simulate a small delay
    setTimeout(() => {
      // Create mock tokens
      const mockTokens = {
        accessToken: `mock-access-token-${Date.now()}`,
        idToken: `mock-id-token-${Date.now()}`,
        refreshToken: `mock-refresh-token-${Date.now()}`,
      }

      // Create mock user data
      const mockUser = {
        email: username,
        username: username,
        'cognito:username': username,
      }

      // Set state
      isAuthenticated.value = true
      tokens.value = mockTokens
      user.value = mockUser

      // Store in localStorage to persist session
      localStorage.setItem('mock_user', JSON.stringify(mockUser))
      localStorage.setItem('mock_tokens', JSON.stringify(mockTokens))

      resolve()
    }, 300) // Small delay to simulate network request
  })

  // ORIGINAL COGNITO CODE - COMMENTED OUT FOR MOCKING
  // return new Promise((resolve, reject) => {
  //   const authenticationDetails = new AuthenticationDetails({
  //     Username: username,
  //     Password: password,
  //   })
  //
  //   const cognitoUser = new CognitoUser({
  //     Username: username,
  //     Pool: userPool,
  //   })
  //
  //   cognitoUser.authenticateUser(authenticationDetails, {
  //     onSuccess: (session: CognitoUserSession) => {
  //       isAuthenticated.value = true
  //       tokens.value = {
  //         accessToken: session.getAccessToken().getJwtToken(),
  //         idToken: session.getIdToken().getJwtToken(),
  //         refreshToken: session.getRefreshToken().getToken(),
  //       }
  //
  //       cognitoUser.getUserAttributes((err, attributes) => {
  //         if (err) {
  //           console.error('Error getting user attributes:', err)
  //           user.value = { email: username }
  //         } else {
  //           const userAttrs: Record<string, string> = {}
  //           attributes?.forEach((attr) => {
  //             userAttrs[attr.Name] = attr.Value
  //           })
  //           user.value = userAttrs
  //         }
  //         resolve()
  //       })
  //     },
  //     onFailure: (err) => {
  //       console.error('Login error:', err)
  //       isAuthenticated.value = false
  //       tokens.value = null
  //       user.value = null
  //       reject(err)
  //     },
  //   })
  // })
}

// Logout function - MOCKED FOR NOW
const logout = async (): Promise<void> => {
  // Clear localStorage
  localStorage.removeItem('mock_user')
  localStorage.removeItem('mock_tokens')
  
  // Clear state
  isAuthenticated.value = false
  tokens.value = null
  user.value = null

  // ORIGINAL COGNITO CODE - COMMENTED OUT FOR MOCKING
  // const cognitoUser = userPool.getCurrentUser()
  // if (cognitoUser) {
  //   cognitoUser.signOut()
  // }
  // isAuthenticated.value = false
  // tokens.value = null
  // user.value = null
}

// Get ID token
const getIdToken = (): string | null => {
  return tokens.value?.idToken || null
}

// Initialize session check on module load
checkSession()

// Export composable (similar to custom hook in React)
export function useAuth() {
  const router = useRouter()

  return {
    // State
    isAuthenticated: isAuth,
    isLoading: loading,
    user: currentUser,
    tokens: computed(() => tokens.value),
    
    // Methods
    login,
    logout: async () => {
      await logout()
      router.push('/')
    },
    checkSession,
    getIdToken,
  }
}

