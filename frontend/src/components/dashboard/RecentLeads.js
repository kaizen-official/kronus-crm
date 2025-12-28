"use client";

import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import Card from "@/src/components/ui/Card";

export default function RecentLeads({ leads }) {
    if (!leads || leads.length === 0) {
        return (
            <Card className="h-full min-h-[200px] flex items-center justify-center text-gray-400">
                No recent leads found.
            </Card>
        );
    }

    return (
        <Card className="h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Recent Leads</h3>
                <Link href="/leads" className="text-sm text-brand-primary hover:underline flex items-center gap-1">
                    View All <HiArrowRight />
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-gray-100 text-gray-500">
                            <th className="pb-3 font-medium">Name</th>
                            <th className="pb-3 font-medium">Property</th>
                            <th className="pb-3 font-medium">Status</th>
                            <th className="pb-3 font-medium text-right">Value</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {leads.map((lead) => (
                            <tr key={lead.id} className="group hover:bg-gray-50 transition-colors cursor-pointer">
                                <td className="py-3 font-medium text-gray-900">
                                    {lead.name}
                                </td>
                                <td className="py-3 text-gray-600">{lead.property || "-"}</td>
                                <td className="py-3">
                                    <StatusBadge status={lead.status} />
                                </td>
                                <td className="py-3 text-right font-medium text-gray-900">
                                    ₹{(lead.value || 0).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

function StatusBadge({ status }) {
    const styles = {
        NEW: "bg-blue-100 text-blue-700",
        CONTACTED: "bg-cyan-100 text-cyan-700",
        INTERESTED: "bg-green-100 text-green-700",
        NOT_INTERESTED: "bg-gray-100 text-gray-700",
        SITE_VISIT: "bg-purple-100 text-purple-700",
        NEGOTIATION: "bg-orange-100 text-orange-700",
        DOCUMENTATION: "bg-indigo-100 text-indigo-700",
        WON: "bg-emerald-100 text-emerald-700",
        LOST: "bg-red-100 text-red-700"
    };

    return (
        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${styles[status] || "bg-gray-50 text-gray-700"}`}>
            {status?.replace(/_/g, ' ')}
        </span>
    );
}
