import { useEffect, useState } from "react";
import axios from "axios";
import UserLayout from "../../components/UserLayout";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("/api/notifications", {
          // headers: {
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
          // },
        });

        // Safe assignment: make sure we always get an array
        const data = Array.isArray(res.data) ? res.data : [];
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <UserLayout>
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      {!Array.isArray(notifications) || notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((note) => (
            <li key={note._id} className="p-3 border rounded shadow">
              <p>{note.description}</p>
              <p className="text-sm text-gray-500">
                Course: {note.course?.title || "Unknown"} |{" "}
                {new Date(note.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
    </UserLayout>
  );
};

export default Notifications;
