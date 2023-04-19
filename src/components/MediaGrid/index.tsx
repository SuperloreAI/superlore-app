import React, { useState, useEffect } from "react";
import { Row, Col, Card, Input, Button } from "antd";
import { FileOutlined, PlusCircleOutlined } from "@ant-design/icons";

interface MediaFile {
  id: string;
  type: "video" | "audio";
  name: string;
}

const generateMockData = (count: number): MediaFile[] => {
  return Array.from({ length: count }, (_, idx) => ({
    id: `file-${idx}`,
    type: idx % 2 === 0 ? "video" : "audio",
    name: `Media File ${idx + 1}`,
  }));
};

const MediaGrid: React.FC = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filteredMediaFiles, setFilteredMediaFiles] = useState<MediaFile[]>([]);
  const [visibleFiles, setVisibleFiles] = useState<MediaFile[]>([]);

  useEffect(() => {
    // Replace this with your API call to fetch media files
    const allMediaFiles = generateMockData(100);
    setMediaFiles(allMediaFiles);
    setFilteredMediaFiles(allMediaFiles);
  }, []);

  useEffect(() => {
    const search = searchText.trim().toLowerCase();
    const filtered = mediaFiles.filter((file) =>
      file.name.toLowerCase().includes(search)
    );
    setFilteredMediaFiles(filtered);
  }, [searchText, mediaFiles]);

  useEffect(() => {
    setVisibleFiles(filteredMediaFiles.slice(0, 30));
  }, [filteredMediaFiles]);

  const handleSeeMoreClick = () => {
    setVisibleFiles(filteredMediaFiles.slice(0, visibleFiles.length + 30));
  };

  return (
    <section>
      <Input
        placeholder="Search media files"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {visibleFiles.map((file) => (
          <Col key={file.id} xs={12} sm={8} md={6} lg={4}>
            <Card
              title={file.name}
              extra={<FileOutlined />}
              style={{ height: "100%" }}
            >
              <p>Type: {file.type}</p>
            </Card>
          </Col>
        ))}
      </Row>
      {visibleFiles.length < filteredMediaFiles.length && (
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={handleSeeMoreClick}
          style={{ marginTop: 16 }}
        >
          See More
        </Button>
      )}
    </section>
  );
};

export default MediaGrid;
