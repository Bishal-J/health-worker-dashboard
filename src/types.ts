// Form entity shape
export interface Form {
  uuid: string;
  title: string;
  description: string;
  // Add other fields as needed
}

// Input for creating a form
export interface CreateFormInput {
  title: string;
  description: string;
  // Match with the form structure expected by the API
}

// API response shape
export interface ApiResponse<T> {
  body: T;
}
