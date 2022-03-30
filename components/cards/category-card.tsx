import Image from 'next/image';
import Typography from '@mui/material/Typography';
import React, { memo } from 'react';
import { CategoryCardImageWrapper, CategoryCardWrapper } from './card.styles';

interface CategoryCardProps {
  label?: string;
  image?: { alt?: string | null; url: string } | null;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  label,
  image,
}) => (
  <CategoryCardWrapper>
    <CategoryCardImageWrapper>
      <Image layout="fixed" width={96} height={96} src={image?.url || ""} alt={image?.alt || ""} />
    </CategoryCardImageWrapper>
    <Typography variant="subtitle2">{label}</Typography>
  </CategoryCardWrapper>
);

export default memo(CategoryCard);
