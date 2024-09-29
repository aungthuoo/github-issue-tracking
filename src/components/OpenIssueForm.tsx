import React, { useState, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ISSUE } from '../queries';

interface PopupFormProps {
  show: boolean;
  onClose: () => void;
}
interface CreateIssueInput {
  repositoryId: string;
  title: string;
  body: string;
}

interface IssueData {
  createIssue: {
    issue: {
      id: string;
      number: number;
      title: string;
      url: string;
    };
  };
}

interface CreateIssueVars {
  input: CreateIssueInput;
}


const OpenIssueForm: React.FC<PopupFormProps> = ({ show, onClose }) => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [createIssue, {  loading, error }] = useMutation<IssueData, CreateIssueVars>(CREATE_ISSUE);
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await createIssue({
        variables: {
          input: {
            repositoryId: 'MDEwOlJlcG9zaXRvcnkyMDM1MDEwOTY=', 
            title,
            body,
          },
        },
      });

      setTitle('');
      setBody('');
      onClose()
    } catch (err) {
      console.error('Error creating issue:', err);
    }
  };
  
  if (!show) return null;

  if (error) return (
    <>
      <p>{error.message }</p>
    </>
  )

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-md">
        <h2 className="mb-4 text-xl font-bold">New Issue</h2>
        <form  onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />


          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
  

            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"  disabled={loading}
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default OpenIssueForm;