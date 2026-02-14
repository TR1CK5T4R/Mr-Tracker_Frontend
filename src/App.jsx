import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import ChatbotPage from "./ChatBotPage";
import DashboardPage from "./DashBoard";
import TodoList from "./TodoList";
import HabitTracker from "./HabitTracker";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chatbot" element={<ChatbotPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/todos" element={<TodoList />} />
      <Route path="/habits" element={<HabitTracker />} />
    </Routes>
  );
}

export default App;

