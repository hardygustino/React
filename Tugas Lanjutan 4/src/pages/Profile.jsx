import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="page">
      <h2>Profile (Protected)</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
