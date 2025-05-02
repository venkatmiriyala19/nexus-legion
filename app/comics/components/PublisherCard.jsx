import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function PublisherCard({ publisher }) {
  // Extract year founded from the full date if available
  const yearFounded =
    publisher.yearFounded !== "Unknown" ? publisher.yearFounded : "N/A";

  // Truncate description to a reasonable length
  const truncateDescription = (text, maxLength = 150) => {
    if (!text || text === "No description available")
      return "No description available";

    // Remove HTML tags
    const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "");

    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substring(0, maxLength) + "...";
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Publisher Logo/Image */}
      <div className="relative h-48 bg-gray-100">
        {publisher.logoImage ? (
          <img
            src={publisher.logoImage}
            alt={`${publisher.name} logo`}
            className="w-full h-full object-contain p-4"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>

      {/* Publisher Information */}
      <div className="p-5 flex-grow flex flex-col">
        <h2 className="text-xl font-bold mb-2 text-blue-900">
          {publisher.name}
        </h2>

        <div className="mb-4 text-sm">
          <div className="flex items-start mb-1">
            <span className="font-semibold mr-2">Founded:</span>
            <span>{yearFounded}</span>
          </div>

          {publisher.countryOfOrigin !== "Unknown" && (
            <div className="flex items-start mb-1">
              <span className="font-semibold mr-2">Country:</span>
              <span>{publisher.countryOfOrigin}</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {truncateDescription(publisher.description)}
        </p>

        {/* Action Buttons */}
        <div className="mt-auto flex justify-between">
          <Link
            href={`/publishers/${publisher.id}`}
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View Comics
          </Link>

          <a
            href={publisher.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <ExternalLink size={16} className="mr-1" />
            <span>Details</span>
          </a>
        </div>
      </div>
    </div>
  );
}
