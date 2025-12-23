"use client";

import { useState, useEffect } from "react";
import api from "@/src/services/api";
import Heading from "@/src/components/ui/Heading";
import { HiMail, HiPhone, HiOfficeBuilding, HiCalendar, HiCurrencyDollar } from "react-icons/hi";

export default function LeadDetail({ lead: initialLead }) {
    const [lead, setLead] = useState(initialLead);
    const [loadingActivities, setLoadingActivities] = useState(true);

    useEffect(() => {
        if (!initialLead?.id) return;

        const fetchFullDetails = async () => {
            try {
                // Fetch full details to get activities
                const response = await api.get(`/leads/${initialLead.id}`);
                setLead(response.data.data);
            } catch (error) {
                console.error("Failed to fetch lead details", error);
            } finally {
                setLoadingActivities(false);
            }
        };

        fetchFullDetails();
    }, [initialLead]);

    if (!lead) return null;

    return (
        <div className="space-y-8">
            {/* Header Info */}
            <div className="flex items-start justify-between">
                <div>
                    <Heading level={2} className="text-3xl! mb-1">{lead.firstName} {lead.lastName}</Heading>
                    <div className="flex items-center gap-4 text-gray-500">
                        {lead.company && (
                            <div className="flex items-center gap-1">
                                <HiOfficeBuilding /> {lead.company}
                            </div>
                        )}
                        <div className="flex items-center gap-1">
                            <HiCalendar /> Added on {new Date(lead.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Estimated Value</div>
                    <div className="text-2xl font-bold text-brand-primary">
                        ₹{(lead.estimatedValue || 0).toLocaleString()}
                    </div>
                </div>
            </div>

            {/* Grid Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DetailItem label="Email" value={lead.email} icon={<HiMail />} isLink href={`mailto:${lead.email}`} />
                <DetailItem label="Phone" value={lead.phone} icon={<HiPhone />} isLink href={`tel:${lead.phone}`} />
                <DetailItem label="Status" value={lead.status} badge />
                <DetailItem label="Priority" value={lead.priority} badge color={lead.priority === 'URGENT' ? 'red' : 'blue'} />
                <DetailItem label="Source" value={lead.source} />
                <DetailItem label="Assigned To" value={lead.assignedTo ? `${lead.assignedTo.firstName} ${lead.assignedTo.lastName}` : "Unassigned"} />
            </div>

            {/* Notes / Description */}
            {lead.notes && (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-2">Notes</h4>
                    <p className="text-gray-700 whitespace-pre-wrap">{lead.notes}</p>
                </div>
            )}

            {/* Recent Activity */}
            <div>
                <h4 className="font-bold text-gray-900 mb-4 border-b pb-2">Recent Activity</h4>
                {loadingActivities ? (
                    <div className="flex items-center gap-2 text-gray-500 italic">
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-brand-primary rounded-full animate-spin"></div>
                        Loading activities...
                    </div>
                ) : lead.activities && lead.activities.length > 0 ? (
                    <div className="space-y-4">
                        {lead.activities.map((activity) => (
                            <div key={activity.id} className="flex gap-3">
                                <div className="w-2 h-2 mt-1.5 rounded-full bg-brand-primary shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-900">{activity.description}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {new Date(activity.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 italic">No recent activities recorded.</p>
                )}
            </div>
        </div>
    );
}

function DetailItem({ label, value, icon, isLink, href, badge, color = 'gray' }) {
    if (!value) return null;

    return (
        <div className="p-4 rounded-xl border border-gray-100 bg-white">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                {icon} {label}
            </div>
            {isLink ? (
                <a href={href} className="text-brand-primary hover:underline font-medium truncate block">
                    {value}
                </a>
            ) : badge ? (
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-${color}-100 text-${color}-700`}>
                    {value}
                </span>
            ) : (
                <div className="font-medium text-gray-900">{value}</div>
            )}
        </div>
    )
}
