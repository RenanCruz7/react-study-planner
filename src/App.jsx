import { Provider } from 'react-redux'
import { ThemeProvider } from './contexts/ThemeContext'
import StudyPlannerPage from './pages/StudyPlannerPage'
import { store } from './store'

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
          <StudyPlannerPage />
      </ThemeProvider>
    </Provider>
  )
}

export default App