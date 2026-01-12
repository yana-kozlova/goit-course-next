import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-12">
            <Image
              src="/icons/logo.svg"
              alt="CRM Logo"
              width={200}
              height={40}
              className="mx-auto"
              priority
            />
          </div>

          {/* Hero Section */}
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to CRM System
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Manage your companies, promotions, and track your business
            performance all in one place.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/dashboard"
              className="px-8 py-4 text-lg bg-gray-900 text-white rounded font-medium hover:bg-gray-800 active:bg-gray-950 transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/companies"
              className="px-8 py-4 text-lg bg-gray-200 text-gray-900 rounded font-medium hover:bg-gray-300 transition-colors"
            >
              View Companies
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Image
                  src="/icons/squares.svg"
                  alt="Dashboard"
                  width={24}
                  height={24}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Dashboard
              </h3>
              <p className="text-gray-600">
                View comprehensive statistics and insights about your business
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Image
                  src="/icons/briefcase.svg"
                  alt="Companies"
                  width={24}
                  height={24}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Companies
              </h3>
              <p className="text-gray-600">
                Manage and track all your company information and details
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Image
                  src="/icons/check.svg"
                  alt="Promotions"
                  width={24}
                  height={24}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Promotions
              </h3>
              <p className="text-gray-600">
                Create and manage promotional campaigns for your companies
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
