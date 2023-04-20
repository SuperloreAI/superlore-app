import React, { useState, useEffect } from "react";
import { Row, Col, Card, Input, Button } from "antd";
import { FileOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Media,
  Query,
  QueryListMediaArgs,
} from "@/lib/graphql/types/types.generated";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { debounce } from "lodash";
import Link from "next/link";
import { renderAssetStatusTag, renderAssetTypeTag } from "@/lib/helpers/tags";
import { MediaAssetStatus, MediaAssetType } from "@/lib/db/types";
import { formatTime } from "@/lib/helpers/time";

interface MediaGridProps {
  graphqlEndpoint: string;
  initialMedia: Media[];
}

const GET_MEDIA = gql`
  query ListMedia($searchString: String, $limit: Int, $cursorStart: String) {
    listMedia(
      searchString: $searchString
      limit: $limit
      cursorStart: $cursorStart
    ) {
      id
      title
      thumbnail
      status
      assetType
      url
    }
  }
`;

const MediaGrid: React.FC<MediaGridProps> = ({
  graphqlEndpoint,
  initialMedia,
}) => {
  const [searchText, setSearchText] = useState("");
  const [visibleFiles, setVisibleFiles] = useState<Media[]>(initialMedia);
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

  const fetchMedia = async (searchString: string, cursorStart: string) => {
    const response = await client.query<
      Pick<Query, "listMedia">,
      QueryListMediaArgs
    >({
      query: GET_MEDIA,
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

    return response.data.listMedia as Media[];
  };

  const debouncedHandleSearchChange = debounce(async (searchValue: string) => {
    const fetchedMedia = await fetchMedia(searchValue, "");
    setVisibleFiles(fetchedMedia as Media[]);
    setCursorStart(fetchedMedia[fetchedMedia.length - 1]?.id || "");
    setHasMoreItems(fetchedMedia.length >= FETCH_LIMIT);
    setIsSearching(false);
  }, 2000);

  const handleSearchChange = (searchValue: string) => {
    setSearchText(searchValue);
    setIsSearching(true);
    debouncedHandleSearchChange(searchValue);
  };

  const handleSeeMoreClick = async () => {
    const fetchedMedia = await fetchMedia(searchText, cursorStart);
    setVisibleFiles([...visibleFiles, ...(fetchedMedia as Media[])]);
    setCursorStart(fetchedMedia[fetchedMedia.length - 1]?.id || "");
    setHasMoreItems(fetchedMedia.length >= FETCH_LIMIT);
  };

  return (
    <section>
      <Input.Search
        placeholder="Search media files"
        value={searchText}
        onChange={(e) => handleSearchChange(e.target.value)}
        loading={isSearching}
      />
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {visibleFiles.map((file) => (
          <Col key={file.id} xs={12} sm={8} md={6} lg={4}>
            <Link href={`/assets/media/${file.id}`}>
              <Card
                title={file.title}
                extra={<FileOutlined />}
                style={{ height: "100%", minWidth: "150px" }}
              >
                <img
                  src={file.thumbnail}
                  alt={`Thumbnail for ${file.title}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    marginBottom: "1rem",
                  }}
                />
                {file.metadata?.duration && (
                  <p>{formatTime(file.metadata.duration)}</p>
                )}
                {renderAssetStatusTag(file.status as MediaAssetStatus)}
                {renderAssetTypeTag(file.assetType as MediaAssetType)}
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

export default MediaGrid;
