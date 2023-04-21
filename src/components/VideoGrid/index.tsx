import React, { useState, useEffect } from "react";
import { Row, Col, Card, Input, Button } from "antd";
import { FileOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Video,
  Query,
  QueryListVideosArgs,
} from "@/lib/graphql/types/types.generated";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { debounce } from "lodash";
import Link from "next/link";

interface VideoGridProps {
  graphqlEndpoint: string;
  initialVideos: Video[];
}

const GET_VIDEOS = gql`
  query ListVideos($searchString: String, $limit: Int, $cursorStart: String) {
    listVideos(
      searchString: $searchString
      limit: $limit
      cursorStart: $cursorStart
    ) {
      id
      title
      thumbnail
      status
      url
    }
  }
`;

const VideoGrid: React.FC<VideoGridProps> = ({
  graphqlEndpoint,
  initialVideos,
}) => {
  const [searchText, setSearchText] = useState("");
  const [visibleVideos, setVisibleVideos] = useState<Video[]>(initialVideos);
  const [cursorStart, setCursorStart] = useState("");
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const FETCH_LIMIT = 30;

  useEffect(() => {
    setCursorStart("");
  }, [searchText]);

  const client = new ApolloClient({
    uri: graphqlEndpoint,
    cache: new InMemoryCache(),
  });

  const fetchVideos = async (searchString: string, cursorStart: string) => {
    const response = await client.query<
      Pick<Query, "listVideos">,
      QueryListVideosArgs
    >({
      query: GET_VIDEOS,
      variables: {
        searchString,
        limit: FETCH_LIMIT,
        cursorStart,
      },
    });
    if (!response || !response.data) {
      console.error("Error: response data is undefined");
      return [];
    }
    return response.data.listVideos as Video[];
  };
  const debouncedHandleSearchChange = debounce(async (searchValue: string) => {
    const fetchedVideos = await fetchVideos(searchValue, "");
    setVisibleVideos(fetchedVideos as Video[]);
    setCursorStart(fetchedVideos[fetchedVideos.length - 1]?.id || "");
    setHasMoreItems(fetchedVideos.length >= FETCH_LIMIT);
    setIsSearching(false);
  }, 2000);

  const handleSearchChange = (searchValue: string) => {
    setSearchText(searchValue);
    setIsSearching(true);
    debouncedHandleSearchChange(searchValue);
  };

  const handleSeeMoreClick = async () => {
    const fetchedVideos = await fetchVideos(searchText, cursorStart);
    setVisibleVideos([...visibleVideos, ...(fetchedVideos as Video[])]);
    setCursorStart(fetchedVideos[fetchedVideos.length - 1]?.id || "");
    setHasMoreItems(fetchedVideos.length >= FETCH_LIMIT);
  };

  return (
    <section>
      <Input.Search
        placeholder="Search video files"
        value={searchText}
        onChange={(e) => handleSearchChange(e.target.value)}
        loading={isSearching}
      />
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {visibleVideos.map((video) => (
          <Col key={video.id} xs={12} sm={8} md={6} lg={4}>
            <Link href={`/videos/${video.id}`}>
              <Card
                title={video.title}
                extra={<FileOutlined />}
                style={{ height: "100%", minWidth: "150px" }}
              >
                <img
                  src={video.thumbnail || ""}
                  alt={`Thumbnail for ${video.title}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    marginBottom: "1rem",
                  }}
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      {hasMoreItems && (
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

export default VideoGrid;
