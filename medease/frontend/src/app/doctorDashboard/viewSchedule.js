import React from "react";

const ViewSchedule = () => {
  // Sample patient schedule data
  const scheduleData = [
    {
      id: 1,
      patientName: "John Doe",
      day: "Monday",
      date: "April 25",
      appointmentTime: "10:00 AM",
      doctor: "Dr. Smith",
      department: "Cardiology",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      day: "Tuesday",
      date: "April 26",
      appointmentTime: "11:00 AM",
      doctor: "Dr. Johnson",
      department: "Dermatology",
    },
    {
      id: 3,
      patientName: "Michael Johnson",
      day: "Wednesday",
      date: "April 27",
      appointmentTime: "12:00 PM",
      doctor: "Dr. Brown",
      department: "Neurology",
    },
    {
      id: 4,
      patientName: "Emily Brown",
      day: "Thursday",
      date: "April 28",
      appointmentTime: "02:00 PM",
      doctor: "Dr. Anderson",
      department: "Ophthalmology",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">View Schedule</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-red-600 uppercase tracking-wider border-b"
              >
                Patient Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-red-600 uppercase tracking-wider border-b"
              >
                Day
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-red-600 uppercase tracking-wider border-b"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-red-600 uppercase tracking-wider border-b"
              >
                Appointment Time
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-red-600 uppercase tracking-wider border-b"
              >
                Doctor
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-red-600 uppercase tracking-wider border-b"
              >
                Department
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {scheduleData.map((scheduleItem) => (
              <tr key={scheduleItem.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b">
                  {scheduleItem.patientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                  {scheduleItem.day}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                  {scheduleItem.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                  {scheduleItem.appointmentTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                  {scheduleItem.doctor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                  {scheduleItem.department}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSchedule;
