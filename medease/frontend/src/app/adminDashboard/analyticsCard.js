// components/AnalyticsCard.js
import React from "react";
import Image from "next/image";

const analyticsData = {
  totalUsers: 1500,
  totalPatients: 1000,
  totalDoctors: 300,
  totalHospitals: 50,
  totalPharmacies: 150,
};

const analyticsCards = [
  {
    title: "Total Users",
    count: analyticsData.totalUsers,
    icon: "/images/admin.png", // Replace with your actual image path
  },
  {
    title: "Total Patients",
    count: analyticsData.totalPatients,
    icon: "/images/patient.png", // Replace with your actual image path
  },
  {
    title: "Total Doctors",
    count: analyticsData.totalDoctors,
    icon: "/images/doctor.png", // Replace with your actual image path
  },
  {
    title: "Total Hospitals",
    count: analyticsData.totalHospitals,
    icon: "/images/hospital.png", // Replace with your actual image path
  },
  // {
  //   title: "Total Pharmacies",
  //   count: analyticsData.totalPharmacies,
  //   icon: "/images/pharmacy.png", // Replace with your actual image path
  // },
];

const AnalyticsCard = () => {
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
