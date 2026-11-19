import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function History() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
          console.error('Access token not found. Please login again.');
          setHistory([]);
          return;
        }

        const response = await axios.get(
          'http://localhost:8000/api/v1/users/history',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('History response:', response.data);

        setHistory(response.data?.data || []);
      } catch (error) {
        console.error('Error fetching history:', error);

        if (error.response?.status === 401) {
          console.error('Unauthorized: Access token is missing or invalid.');
        }

        setHistory([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="lg:mt-8 bg-white grid grid-cols-1 px-8 pt-6 xl:grid-cols-3 xl:gap-4">
      <div className="mb-4 col-span-full xl:mb-2">
        <div className="text-3xl font-black text-gray-900">
          Watch history
        </div>

        <br />

        {isLoading ? (
          <div className="text-center my-72">
            <div className="p-4 text-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin fill-black"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />

                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.293 28.8227 92.871 24.3692 89.816 20.348C85.845 15.1192 80.882 10.7238 75.212 7.41289C69.542 4.10194 63.275 1.94025 56.769 1.05124C51.766 0.367541 46.697 0.446843 41.734 1.27873C39.261 1.69328 37.813 4.19778 38.450 6.62326C39.087 9.04874 41.569 10.4717 44.050 10.1071C47.851 9.54855 51.719 9.52689 55.540 10.0491C60.864 10.7766 65.992 12.5457 70.633 15.2552C75.273 17.9648 79.334 21.5619 82.584 25.841C84.917 28.9121 86.799 32.2913 88.181 35.8758C89.083 38.2158 91.542 39.6781 93.967 39.0409Z"
                    fill="currentFill"
                  />
                </svg>

                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* ********************content***************** */}
            {history.length > 0 ? (
              <section>
                <div className="container">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {history.map((video) => (
                      <div key={video._id}>
                        <div className="relative">
                          <Link to={`/watch/${video._id}`}>
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-80 h-40 object-cover"
                            />
                          </Link>
                        </div>

                        <div className="mt-2 md:mt-0">
                          <h3 className="text-lg font-bold truncate">
                            <Link to={`/watch/${video._id}`}>
                              {video.title}
                            </Link>
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ) : (
              <div className="text-gray-600 text-lg">
                No history available
              </div>
            )}
          </div>
          // *************************content****************************
        )}
      </div>
    </div>
  );
}

export default History;