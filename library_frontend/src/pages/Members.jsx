import { useEffect, useState } from "react";
import API from "../api/axios";

function Members() {

  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(true);

  // Fetch Members
  const fetchMembers = async () => {

    try {

      const response = await API.get("/members");

      setMembers(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-6">
        Members
      </h1>

      {loading ? (

        <p>Loading...</p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {members.map((member) => (

            <div
              key={member.id}
              className="bg-white p-6 rounded-2xl shadow-md"
            >

              <h2 className="text-xl font-bold mb-2">
                {member.name}
              </h2>

              <p className="text-gray-700">
                Email: {member.email}
              </p>

              <p className="text-gray-700">
                Phone: {member.phone}
              </p>

              <p className="text-gray-700">
                Role: {member.role}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Members;