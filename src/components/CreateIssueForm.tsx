import React, { useState, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ISSUE } from '../queries';

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

const CreateIssueForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [createIssue, { data, loading, error }] = useMutation<IssueData, CreateIssueVars>(CREATE_ISSUE);

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
    } catch (err) {
      console.error('Error creating issue:', err);
    }
  };

  return (
    <div>
      <h2>Create a New Issue</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Body:
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Issue'}
        </button>
      </form>

      {error && <p>Error creating issue: {error.message}</p>}
      {data && (
        <p>
          Issue created: <a href={data.createIssue.issue.url}>{data.createIssue.issue.title}</a>
        </p>
      )}
    </div>
  );
};

export default CreateIssueForm;