// src/pages/SharedView.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ShareSidebar, {menuItems} from '../Sidebar/ShareSidebar';
import SharedMain from './SharedMain';

interface ContentItem {
  _id: string;
  title: string;
  link: string;
  contentType: string;
  thumbnailUrl?: string;
  tags: string[];
}

const SharedView: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string>('Show All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchShared = async () => {
      if (!token) {
        setError('Invalid link.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`/api/shared/${token}`);
        // Backend sends back { data: ContentItem[] }
        setContent(res.data.data);
      } catch (err) {
        setError('Invalid or expired link.');
      } finally {
        setLoading(false);
      }
    };

    fetchShared();
  }, [token]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading…</div>;
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden w-full">

      <SharedMain />
    </div>
  );
};

export default SharedView;
