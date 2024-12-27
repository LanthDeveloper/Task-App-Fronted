const HelpHttp = () => {
  // Utility function to create standardized error responses
  const createErrorResponse = (status, statusText, additionalData = {}) => ({
    err: true,
    status: status || "00",
    statusText: statusText || "Ocurrió un error",
    ...additionalData,
  });

  const customFetch = (endpoint, options = {}) => {
    // Set up default headers
    const defaultHeaders = {
      accept: "application/json",
      "Content-Type": "application/json",
    };

    // Create abort controller for timeout
    const controller = new AbortController();

    // Prepare fetch options
    const fetchOptions = {
      method: options.method || "GET",
      credentials: "include",
      signal: controller.signal,
      headers: options.headers
        ? { ...defaultHeaders, ...options.headers }
        : defaultHeaders,
    };

    // Add body if present
    if (options.body) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    // Set 20-second timeout
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    return fetch(endpoint, fetchOptions)
      .then(async (response) => {
        // Clear the timeout
        clearTimeout(timeoutId);

        // Check content type
        const contentType = response.headers.get("content-type");
        const isJsonResponse =
          contentType && contentType.includes("application/json");

        // Handle non-successful responses
        if (!response.ok) {
          let errorData = createErrorResponse(
            response.status,
            response.statusText
          );

          // Try to parse JSON error if possible
          if (isJsonResponse) {
            try {
              const jsonError = await response.json();
              errorData = {
                ...errorData,
                ...jsonError,
              };
            } catch (parseError) {
              console.error("Error parsing JSON error response:", parseError);
            }
          }

          return Promise.reject(errorData);
        }

        // Return parsed JSON or raw response
        return isJsonResponse ? response.json() : response;
      })
      .catch((err) => {
        // Handle specific timeout errors
        if (err.name === "AbortError") {
          return Promise.reject(
            createErrorResponse(
              "TIMEOUT",
              "La solicitud excedió el tiempo límite"
            )
          );
        }

        // Rethrow other errors
        return Promise.reject(err);
      });
  };

  // HTTP method helpers
  const get = (url, options = {}) =>
    customFetch(url, { ...options, method: "GET" });

  const post = (url, options = {}) =>
    customFetch(url, { ...options, method: "POST" });

  const put = (url, options = {}) =>
    customFetch(url, { ...options, method: "PUT" });

  const del = (url, options = {}) =>
    customFetch(url, { ...options, method: "DELETE" });

  // Return the utility methods
  return {
    get,
    post,
    put,
    del,
  };
};

export default HelpHttp;
