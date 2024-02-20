import React, { useState, useEffect } from "react";
import Image from "next/image";

const AnalyticsCard = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API or backend endpoint
        const response = await fetch("/api/analytics"); // Adjust the API endpoint accordingly
        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchData();
  }, []);

  const analyticsCards = [
    {
      title: "Total Users",
      count: analyticsData?.totalUsers || 0,
      icon: "/images/admin.png", // Replace with your actual image path
    },
    {
      title: "Total Patients",
      count: analyticsData?.totalPatients || 0,
      icon: "/images/patient.png", // Replace with your actual image path
    },
    {
      title: "Total Doctors",
      count: analyticsData?.totalDoctors || 0,
      icon: "/images/doctor.png", // Replace with your actual image path
    },
    {
      title: "Total Hospitals",
      count: analyticsData?.totalHospitals || 0,
      icon: "/images/hospital.png", // Replace with your actual image path
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {analyticsCards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-md shadow-md flex items-center justify-between transition duration-300 transform hover:scale-105"
        >
          <div>
            <p className="text-lg font-semibold text-gray-700">{card.title}</p>
            <p className="text-3xl font-bold text-blue-500">{card.count}</p>
          </div>
          <Image src={card.icon} alt={card.title} width={40} height={40} />
        </div>
      ))}
    </div>
  );
};

export default AnalyticsCard;
