"use client";

import { useRef, useState } from "react";
import ContributionGrid from "./ContributionGrid";
import LanguagesChart from "./LanguagesChart";
import StatsCard from "./StatsCard";
import { Download, Star, GitBranch, GitPullRequest, AlertCircle, Calendar, TrendingUp } from "lucide-react";

export default function Dashboard({ stats }: any) {
  const {
    name,
    totalRepos,
    totalStars,
    completedRepos,
    inactiveRepos,
    mergedPRs,
    issues,
    totalCommits,
    calendar,
    languages,
    mostActiveDay,
    mostActiveMonth, 
  } = stats;

  const dashboardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPDF = async () => {
    if (!dashboardRef.current) return;

    setIsGenerating(true);

    try {
      // Dynamic import to avoid SSR issues
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const element = dashboardRef.current;
      
      // Create canvas with better quality
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        ignoreElements: (element) => {
          // Ignore the download button in PDF
          return element.classList.contains('pdf-ignore');
        }
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${name}-github-review.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mt-8 w-full max-w-6xl">
      <div ref={dashboardRef} className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Header - Professional styling without gradients */}
        <div className="bg-slate-800 p-8 text-white border-b-4 border-indigo-600">
          <h2 className="text-4xl font-bold mb-2 text-white">{name}'s GitHub Review</h2>
          <p className="text-slate-300 text-lg">Annual contribution summary and statistics</p>
        </div>

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <StatsCard 
              title="Total Commits" 
              value={totalCommits} 
              icon={<GitBranch className="w-5 h-5" />}
              color="indigo"
            />
            <StatsCard 
              title="Repositories" 
              value={totalRepos} 
              icon={<Calendar className="w-5 h-5" />}
              color="purple"
            />
            <StatsCard 
              title="Stars Earned" 
              value={totalStars} 
              icon={<Star className="w-5 h-5" />}
              color="amber"
            />
            <StatsCard 
              title="Pull Requests" 
              value={mergedPRs} 
              icon={<GitPullRequest className="w-5 h-5" />}
              color="emerald"
            />
            <StatsCard 
              title="Issues Created" 
              value={issues} 
              icon={<AlertCircle className="w-5 h-5" />}
              color="rose"
            />
            <StatsCard 
              title="Active Projects" 
              value={completedRepos} 
              icon={<TrendingUp className="w-5 h-5" />}
              color="cyan"
            />
          </div>

          {/* Activity Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 rounded-xl p-6 shadow-sm border border-slate-200">
              <p className="text-slate-600 text-sm font-medium mb-1">Most Active Day</p>
              <p className="text-2xl font-bold text-slate-800">{mostActiveDay}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 shadow-sm border border-slate-200">
              <p className="text-slate-600 text-sm font-medium mb-1">Most Active Month</p>
              <p className="text-2xl font-bold text-slate-800">{mostActiveMonth}</p>
            </div>
          </div>

          {/* Contribution Grid */}
          <div className="bg-slate-50 rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Contribution Activity</h3>
            <ContributionGrid calendar={calendar} />
          </div>

          {/* Languages Chart */}
          <div className="bg-slate-50 rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Languages Used</h3>
            <div className="flex justify-center">
              <LanguagesChart data={languages} />
            </div>
          </div>

          {/* Download Button */}
          <div className="flex justify-center pdf-ignore">
            <button
              onClick={downloadPDF}
              disabled={isGenerating}
              className="bg-indigo-600 text-white py-3 px-8 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Download className="w-5 h-5" />
              {isGenerating ? 'Generating PDF...' : 'Download PDF Report'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

