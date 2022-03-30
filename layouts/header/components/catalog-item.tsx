import { Button } from 'components/button';
import { CategoryCard } from 'components/cards';
import ArrowDown from 'components/icons/arrow-down';
import { Paths } from 'config/site-paths';
import colors from 'config/theme';
import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';

interface CatalogItemProps {
  image?: { alt?: string | null; url: string } | null;
  title?: string;
  slug?: string;
  children?: {
    title: string;
    slug: string;
  }[];
}

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledLink = styled.a`
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  color: ${colors.black};
  cursor: pointer;
`;

const CatalogItem: React.FC<CatalogItemProps> = ({
  image,
  title,
  children,
  slug,
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <ItemWrapper>
      <Link href={`${Paths.CATEGORY_PRODUCTS}${slug}`}>
        <a>
          <CategoryCard label={title} image={image} />
        </a>
      </Link>
      {children?.slice(0, expanded ? children.length : 3).map((child) => (
        <Link href={`${Paths.CATEGORY_PRODUCTS}${child.slug}`}>
          <StyledLink>{child.title}</StyledLink>
        </Link>
      ))}
      {children && children?.length > 3 && (
        <Button
          variant="text"
          size="small"
          sx={{ maxWidth: 'max-content' }}
          endIcon={
            <ArrowDown
              style={{ transform: `rotate(${expanded ? '180deg' : 0})` }}
            />
          }
          color="secondary"
          onClick={() => setExpanded(!expanded)}
        >
          Показать все
        </Button>
      )}
    </ItemWrapper>
  );
};

export default CatalogItem;
