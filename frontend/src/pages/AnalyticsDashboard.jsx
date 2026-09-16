import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import analyticsService from "../services/analyticsService";

import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";

function AnalyticsDashboard() {

    const { workspaceId } = useParams();

    const [workspaceStats, setWorkspaceStats] = useState(null);
    const [cardsByStatus, setCardsByStatus] = useState([]);
    const [cardsByLabel, setCardsByLabel] = useState([]);
    const [memberWorkload, setMemberWorkload] = useState([]);
    const [upcomingDueCards, setUpcomingDueCards] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

  
    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            setError("");

            const [
                workspaceData,
                statusData,
                labelData,
                workloadData,
                dueData
            ] = await Promise.all([
                analyticsService.getWorkspaceStats(workspaceId),
                analyticsService.getCardsByStatus(workspaceId),
                analyticsService.getCardsByLabel(workspaceId),
                analyticsService.getMemberWorkload(workspaceId),
                analyticsService.getUpcomingDueCards(workspaceId)
            ]);

            setWorkspaceStats(workspaceData);
            setCardsByStatus(statusData);
            setCardsByLabel(labelData);
            setMemberWorkload(workloadData);
            setUpcomingDueCards(dueData);

        } catch (error) {
            console.error("Failed to load analytics:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load analytics."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(!workspaceId){
            setError("Workspace ID is missing.");
            setLoading(false);
            return;
        }

        fetchAnalytics();
    }, [workspaceId]);


    const getMaxValue = (items) => {
        if (items.length === 0) {
            return 1;
        }

        return Math.max(
            ...items.map((item) => item.totalCards)
        );
    };


    const statusMax = getMaxValue(cardsByStatus);
    const labelMax = getMaxValue(cardsByLabel);
    const workloadMax = getMaxValue(memberWorkload);


    if (!workspaceId) {
        return (
            <div className="analytics-page-state">
                <EmptyState
                    title="Workspace not found"
                    message="A valid workspace is required to view analytics."
                />
            </div>
        );
    }

    if (loading) {
        return (
            <div className="analytics-page-state">
                <LoadingState message="Loading analytics..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="analytics-page-state">
                <ErrorState
                    title="Unable to load analytics"
                    message={error}
                    onRetry={fetchAnalytics}
                />
            </div>
        );
    }

    return (
        <div className="analytics-dashboard">

            <div className="analytics-header">
                <div>
                    <h1>Analytics Dashboard</h1>

                    <p className="analytics-workspace-name">
                        {workspaceStats?.workspaceName}
                    </p>

                    <p>Get an overview of your project activity and workload.</p>
                </div>
            </div>


            {/* Summary Cards */}

            <div className="analytics-summary">

                <div className="analytics-stat-card">
                    <div className="analytics-stat-icon">
                        B
                    </div>

                    <div>
                        <p>Total Boards</p>
                        <h2>
                            {workspaceStats?.totalBoards || 0}
                        </h2>
                    </div>
                </div>


                <div className="analytics-stat-card">
                    <div className="analytics-stat-icon">
                        C
                    </div>

                    <div>
                        <p>Total Cards</p>
                        <h2>
                            {workspaceStats?.totalCards || 0}
                        </h2>
                    </div>
                </div>


                <div className="analytics-stat-card">
                    <div className="analytics-stat-icon">
                        D
                    </div>

                    <div>
                        <p>Overdue Cards</p>
                        <h2>
                            {workspaceStats?.overdueCards || 0}
                        </h2>
                    </div>
                </div>


                <div className="analytics-stat-card">
                    <div className="analytics-stat-icon">
                        M
                    </div>

                    <div>
                        <p>Workspace Members</p>
                        <h2>
                            {workspaceStats?.totalMembers || 0}
                        </h2>
                    </div>
                </div>

            </div>


            <div className="analytics-grid">


                {/* Cards by Status */}

                <section className="analytics-section">

                    <div className="analytics-section-header">
                        <div>
                            <h2>Cards by Status</h2>
                            <p>Distribution across your lists</p>
                        </div>
                    </div>

                    {cardsByStatus.length === 0 ? (
                        <EmptyState
                            title="No card data"
                            message="Create some cards to see the distribution."
                        />
                    ) : (
                        <div className="analytics-list">

                            {cardsByStatus.map((item) => (

                                <div
                                    key={item.list}
                                    className="analytics-row"
                                >

                                    <div className="analytics-row-header">
                                        <span>{item.list}</span>
                                        <strong>
                                            {item.totalCards}
                                        </strong>
                                    </div>

                                    <div className="analytics-bar">
                                        <div
                                            className="analytics-bar-fill"
                                            style={{
                                                width: `${(
                                                    item.totalCards /
                                                    statusMax
                                                ) * 100}%`
                                            }}
                                        />
                                    </div>

                                </div>

                            ))}

                        </div>
                    )}

                </section>


                {/* Cards by Label */}

                <section className="analytics-section">

                    <div className="analytics-section-header">
                        <div>
                            <h2>Cards by Label</h2>
                            <p>Most frequently used labels</p>
                        </div>
                    </div>

                    {cardsByLabel.length === 0 ? (
                        <EmptyState
                            title="No labels yet"
                            message="Add labels to your cards to see label analytics."
                        />
                    ) : (
                        <div className="analytics-list">

                            {cardsByLabel.map((item) => (

                                <div
                                    key={item._id}
                                    className="analytics-row"
                                >

                                    <div className="analytics-row-header">
                                        <span>
                                            {item._id}
                                        </span>

                                        <strong>
                                            {item.totalCards}
                                        </strong>
                                    </div>

                                    <div className="analytics-bar">
                                        <div
                                            className="analytics-bar-fill"
                                            style={{
                                                width: `${(
                                                    item.totalCards /
                                                    labelMax
                                                ) * 100}%`
                                            }}
                                        />
                                    </div>

                                </div>

                            ))}

                        </div>
                    )}

                </section>


                {/* Member Workload */}

                <section className="analytics-section">

                    <div className="analytics-section-header">
                        <div>
                            <h2>Member Workload</h2>
                            <p>Cards currently assigned to members</p>
                        </div>
                    </div>

                    {memberWorkload.length === 0 ? (
                        <EmptyState
                            title="No assigned cards"
                            message="Assign cards to workspace members to see workload."
                        />
                    ) : (
                        <div className="analytics-list">

                            {memberWorkload.map((member) => (

                                <div
                                    key={member.userId}
                                    className="analytics-workload-row"
                                >

                                    <div className="analytics-member-info">

                                        <div className="analytics-avatar">
                                            {member.name
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div>
                                            <strong>
                                                {member.name}
                                            </strong>

                                            <p>
                                                {member.email}
                                            </p>
                                        </div>

                                    </div>


                                    <div className="analytics-workload">

                                        <div className="analytics-workload-top">
                                            <span>
                                                {member.totalCards} cards
                                            </span>
                                        </div>

                                        <div className="analytics-bar">
                                            <div
                                                className="analytics-bar-fill"
                                                style={{
                                                    width: `${(
                                                        member.totalCards /
                                                        workloadMax
                                                    ) * 100}%`
                                                }}
                                            />
                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>
                    )}

                </section>


                {/* Upcoming Due Cards */}

                <section className="analytics-section">

                    <div className="analytics-section-header">
                        <div>
                            <h2>Upcoming Due Cards</h2>
                            <p>Cards due within the next 7 days</p>
                        </div>
                    </div>

                    {upcomingDueCards.length === 0 ? (
                        <EmptyState
                            title="No upcoming due cards"
                            message="There are no cards due within the next 7 days."
                        />
                    ) : (
                        <div className="analytics-due-list">

                            {upcomingDueCards.map((card) => (

                                <div
                                    key={card._id}
                                    className="analytics-due-card"
                                >

                                    <div>
                                        <h3>
                                            {card.title}
                                        </h3>

                                        <span>
                                            Due:{" "}
                                            {new Date(
                                                card.dueDate
                                            ).toLocaleDateString("en-IN")}
                                        </span>
                                    </div>

                                    <span
                                        className={`priority priority-${card.priority}`}
                                    >
                                        {card.priority}
                                    </span>

                                </div>

                            ))}

                        </div>
                    )}

                </section>

            </div>

        </div>
    );
}

export default AnalyticsDashboard;