import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api';
import Papa from 'papaparse';
import { toast } from 'react-toastify';
import {
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaDownload,
  FaFileExport,
  FaChevronLeft,
  FaChevronRight,
  FaSortUp,
  FaSortDown,
  FaSort,
  FaTimes,
  FaFileAlt,
} from 'react-icons/fa';

const ApplicationHistory = () => {
  const [applications, setApplications] = useState([]);
  const [visaTypes, setVisaTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    searchTerm: '',
    startDate: '',
    endDate: '',
    statuses: [],
    visaTypeId: '',
  });
  const [sortConfig, setSortConfig] = useState({ field: 'application_date', order: 'desc' });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
  });
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'in review', label: 'In Review', color: 'blue' },
    { value: 'approved', label: 'Approved', color: 'green' },
    { value: 'rejected', label: 'Rejected', color: 'red' },
    { value: 'more info required', label: 'More Info Required', color: 'purple' },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [appsRes, typesRes] = await Promise.all([
        axios.get('/applicant/applications'),
        axios.get('/visa-types'),
      ]);
      setApplications(appsRes.data);
      setVisaTypes(typesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load application history');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleStatusToggle = (status) => {
    setFilters((prev) => {
      const statuses = prev.statuses.includes(status)
        ? prev.statuses.filter((s) => s !== status)
        : [...prev.statuses, status];
      return { ...prev, statuses };
    });
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      startDate: '',
      endDate: '',
      statuses: [],
      visaTypeId: '',
    });
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleSort = (field) => {
    setSortConfig((prev) => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getSortIcon = (field) => {
    if (sortConfig.field !== field) return <FaSort className="opacity-40" />;
    return sortConfig.order === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  const getFilteredAndSortedApplications = () => {
    let filtered = [...applications];

    // Search filter
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app._id.toLowerCase().includes(term) ||
          app.notes?.toLowerCase().includes(term) ||
          app.visa_type?.name?.toLowerCase().includes(term)
      );
    }

    // Date range filter
    if (filters.startDate) {
      filtered = filtered.filter(
        (app) => new Date(app.application_date) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      filtered = filtered.filter(
        (app) => new Date(app.application_date) <= new Date(filters.endDate)
      );
    }

    // Status filter
    if (filters.statuses.length > 0) {
      filtered = filtered.filter((app) =>
        filters.statuses.includes(app.status.status_name.toLowerCase())
      );
    }

    // Visa type filter
    if (filters.visaTypeId) {
      filtered = filtered.filter((app) => app.type_id === filters.visaTypeId);
    }

    // Sorting
    filtered.sort((a, b) => {
      let aVal, bVal;
      switch (sortConfig.field) {
        case 'application_date':
          aVal = new Date(a.application_date);
          bVal = new Date(b.application_date);
          break;
        case 'visa_type':
          aVal = a.visa_type?.name || '';
          bVal = b.visa_type?.name || '';
          break;
        case 'status':
          aVal = a.status?.status_name || '';
          bVal = b.status?.status_name || '';
          break;
        case 'applicant':
          aVal = a.full_name || '';
          bVal = b.full_name || '';
          break;
        default:
          return 0;
      }

      if (aVal < bVal) return sortConfig.order === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.order === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  const filteredApplications = getFilteredAndSortedApplications();
  const totalPages = Math.ceil(filteredApplications.length / pagination.itemsPerPage);
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const paginatedApplications = filteredApplications.slice(
    startIndex,
    startIndex + pagination.itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  const handleItemsPerPageChange = (value) => {
    setPagination({ currentPage: 1, itemsPerPage: parseInt(value) });
  };

  const exportToCSV = () => {
    if (filteredApplications.length === 0) {
      toast.warning('No data to export');
      return;
    }

    const csvData = filteredApplications.map((app) => ({
      'Application ID': app._id,
      'Application Date': new Date(app.application_date).toLocaleDateString('en-IN'),
      'Full Name': app.full_name,
      'Passport Number': app.passport_number,
      'Nationality': app.nationality,
      'Visa Type': app.visa_type?.name || 'N/A',
      'Purpose': app.purpose_of_travel,
      'Arrival Date': app.intended_arrival_date
        ? new Date(app.intended_arrival_date).toLocaleDateString('en-IN')
        : 'N/A',
      'Departure Date': app.intended_departure_date
        ? new Date(app.intended_departure_date).toLocaleDateString('en-IN')
        : 'N/A',
      'Duration (days)': app.duration_of_stay || 'N/A',
      Status: app.status?.status_name || 'N/A',
      Notes: app.notes || '',
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `application-history-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    toast.success('Application history exported successfully!');
  };

  const downloadDocuments = async (applicationId) => {
    try {
      const response = await axios.get(`/documents/${applicationId}`);
      const documents = response.data;

      if (documents.length === 0) {
        toast.info('No documents found for this application');
        return;
      }

      documents.forEach((doc) => {
        const link = document.createElement('a');
        link.href = doc.file_path;
        link.download = doc.file_name;
        link.target = '_blank';
        link.click();
      });

      toast.success(`Downloading ${documents.length} document(s)`);
    } catch (error) {
      console.error('Error downloading documents:', error);
      toast.error('Failed to download documents');
    }
  };

  const getStatusBadge = (status) => {
    const statusName = status?.status_name?.toLowerCase() || 'pending';
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'in review': 'bg-blue-100 text-blue-800 border-blue-300',
      approved: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300',
      'more info required': 'bg-purple-100 text-purple-800 border-purple-300',
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border-2 ${
          colors[statusName] || colors.pending
        }`}
      >
        {status?.status_name || 'Pending'}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const activeFilterCount =
    (filters.searchTerm ? 1 : 0) +
    (filters.startDate ? 1 : 0) +
    (filters.endDate ? 1 : 0) +
    filters.statuses.length +
    (filters.visaTypeId ? 1 : 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#be0b32] to-[#8c0826] rounded-t-lg shadow-lg p-6 text-white">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FaFileAlt />
            Application History
          </h1>
          <p className="mt-2 opacity-90">View and manage all your visa applications</p>
        </div>

        {/* Action Bar */}
        <div className="bg-white shadow-lg p-4 border-b">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 min-w-[250px]">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by Application ID or notes..."
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#be0b32] focus:border-transparent"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  showFilters
                    ? 'bg-[#be0b32] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FaFilter />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-white text-[#be0b32] px-2 py-0.5 rounded-full text-xs font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <button
                onClick={exportToCSV}
                disabled={filteredApplications.length === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filteredApplications.length === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <FaFileExport />
                Export CSV
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">Advanced Filters</h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    <FaTimes />
                    Clear All
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Date Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaCalendarAlt className="inline mr-1" />
                    Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={filters.startDate}
                      onChange={(e) => handleFilterChange('startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#be0b32] focus:border-transparent"
                      lang="en-IN"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaCalendarAlt className="inline mr-1" />
                    End Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={filters.endDate}
                      onChange={(e) => handleFilterChange('endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#be0b32] focus:border-transparent"
                      lang="en-IN"
                    />
                  </div>
                </div>

                {/* Visa Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Visa Type
                  </label>
                  <select
                    value={filters.visaTypeId}
                    onChange={(e) => handleFilterChange('visaTypeId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#be0b32] focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    {visaTypes.map((type) => (
                      <option key={type._id} value={type._id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Items Per Page */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Items Per Page
                  </label>
                  <select
                    value={pagination.itemsPerPage}
                    onChange={(e) => handleItemsPerPageChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#be0b32] focus:border-transparent"
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
              </div>

              {/* Status Checkboxes */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <div className="flex flex-wrap gap-3">
                  {statusOptions.map((status) => (
                    <label
                      key={status.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.statuses.includes(status.value)}
                        onChange={() => handleStatusToggle(status.value)}
                        className="w-4 h-4 text-[#be0b32] border-gray-300 rounded focus:ring-[#be0b32]"
                      />
                      <span className={`text-sm font-medium text-${status.color}-600`}>
                        {status.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white shadow-lg overflow-hidden">
          {paginatedApplications.length === 0 ? (
            <div className="text-center py-12">
              <FaFileAlt className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-600 font-medium">No applications found</p>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search term</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Application ID
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('application_date')}
                      >
                        <div className="flex items-center gap-2">
                          Date
                          {getSortIcon('application_date')}
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('applicant')}
                      >
                        <div className="flex items-center gap-2">
                          Applicant
                          {getSortIcon('applicant')}
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('visa_type')}
                      >
                        <div className="flex items-center gap-2">
                          Visa Type
                          {getSortIcon('visa_type')}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Travel Dates
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('status')}
                      >
                        <div className="flex items-center gap-2">
                          Status
                          {getSortIcon('status')}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedApplications.map((app) => (
                      <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                          {app._id.slice(-8)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(app.application_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{app.full_name}</div>
                          <div className="text-xs text-gray-500">{app.nationality}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {app.visa_type?.name || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <div>{formatDate(app.intended_arrival_date)}</div>
                          <div className="text-xs text-gray-500">
                            to {formatDate(app.intended_departure_date)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(app.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <Link
                            to={`/applications/${app._id}`}
                            className="text-[#be0b32] hover:text-[#8c0826] transition-colors"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => downloadDocuments(app._id)}
                            className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                          >
                            <FaDownload />
                            Docs
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing{' '}
                    <span className="font-medium">
                      {startIndex + 1}-{Math.min(startIndex + pagination.itemsPerPage, filteredApplications.length)}
                    </span>{' '}
                    of <span className="font-medium">{filteredApplications.length}</span> results
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        pagination.currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                      }`}
                    >
                      <FaChevronLeft />
                    </button>

                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (pagination.currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (pagination.currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = pagination.currentPage - 2 + i;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-3 py-1 rounded-lg transition-all duration-200 ${
                              pagination.currentPage === pageNum
                                ? 'bg-[#be0b32] text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === totalPages}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        pagination.currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                      }`}
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationHistory;
