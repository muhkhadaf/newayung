export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Total Products</h3>
                    <p className="text-3xl font-bold text-gray-900">--</p>
                    <p className="text-sm text-gray-400 mt-2">Manage your services</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Portfolio Items</h3>
                    <p className="text-3xl font-bold text-gray-900">--</p>
                    <p className="text-sm text-gray-400 mt-2">Showcase your work</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">FAQs</h3>
                    <p className="text-3xl font-bold text-gray-900">--</p>
                    <p className="text-sm text-gray-400 mt-2">Answer common questions</p>
                </div>
            </div>

            <div className="mt-8 bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
                <h2 className="text-lg font-medium text-gray-900 mb-2">Welcome to Ayung CMS</h2>
                <p className="text-gray-500">Select a menu item from the sidebar to start managing your content.</p>
            </div>
        </div>
    );
}
