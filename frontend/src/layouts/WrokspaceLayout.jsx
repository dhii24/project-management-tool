import { Link, Outlet, useParams } from "react-router-dom";

function WorkspaceLayout(){

    const { workspaceId } = useParams();

    return (

        <div className="workspace-layout">
            <aside className="workspace-sidebar">

                <div className="workspace-sidebar-header">
                    <h2>Workspace</h2>
                </div>

                <nav className="workspace-navigation">
                    <Link to={`/workspaces/${workspaceId}`}>Overview</Link>
                    <Link to={`/workspaces/${workspaceId}/boards`}>Boards</Link>
                    <Link to={`/workspaces/${workspaceId}/members`}>Members</Link>
                    <Link to={`/workspaces/${workspaceId}/settings`}>Settings</Link>
                </nav>

            </aside>

            <main className="workspace-main">
                <Outlet />
            </main>

        </div>

    );
}

export default WorkspaceLayout;