import { useState } from "react";
import Header from "@/components/header";
import PatientRegistration from "@/components/patient-registration";
import PatientList from "@/components/patient-list";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"registration" | "patients">("registration");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("registration")}
                className={`border-b-2 py-2 px-1 text-sm font-medium flex items-center space-x-2 ${
                  activeTab === "registration"
                    ? "border-clinic-primary text-clinic-primary-dark"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Patient Registration</span>
              </button>
              <button
                onClick={() => setActiveTab("patients")}
                className={`border-b-2 py-2 px-1 text-sm font-medium flex items-center space-x-2 ${
                  activeTab === "patients"
                    ? "border-clinic-primary text-clinic-primary-dark"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>All Patients</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "registration" && (
          <PatientRegistration onPatientAdded={() => setActiveTab("patients")} />
        )}
        {activeTab === "patients" && (
          <PatientList onAddNewPatient={() => setActiveTab("registration")} />
        )}
      </div>
    </div>
  );
}
