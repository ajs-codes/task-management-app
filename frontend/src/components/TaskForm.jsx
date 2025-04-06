"use client";
import { useFormik } from "formik";
import * as Yup from "yup";

const TaskForm = ({ initialValues, onSubmit, buttonText = "Submit" }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "Pending",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Task name is required")
        .min(3, "Task name must be at least 3 characters")
        .max(50, "Task name must be at most 50 characters"),
      description: Yup.string(),
      startDate: Yup.date()
        .required("Start date is required")
        .min(
          new Date().toISOString().split("T")[0],
          "Start date cannot be in the past"
        ),
      endDate: Yup.date()
        .required("End date is required")
        .min(Yup.ref("startDate"), "End date must be after start date"),
      status: Yup.string().required("Status is required"),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // Prevent page reload
        formik.handleSubmit(e);
      }}
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white ${
            formik.touched.name && formik.errors.name
              ? "border-red-500"
              : "border-gray-600"
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="3"
          className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white ${
            formik.touched.description && formik.errors.description
              ? "border-red-500"
              : "border-gray-600"
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        ></textarea>
        {formik.touched.description && formik.errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {formik.errors.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Start Date
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white ${
              formik.touched.startDate && formik.errors.startDate
                ? "border-red-500"
                : "border-gray-600"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.startDate}
          />
          {formik.touched.startDate && formik.errors.startDate && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.startDate}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            End Date
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white ${
              formik.touched.endDate && formik.errors.endDate
                ? "border-red-500"
                : "border-gray-600"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.endDate}
          />
          {formik.touched.endDate && formik.errors.endDate && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.endDate}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white ${
              formik.touched.status && formik.errors.status
                ? "border-red-500"
                : "border-gray-600"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.status}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          {formik.touched.status && formik.errors.status && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.status}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
