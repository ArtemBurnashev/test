import Image from 'next/image';
import Typography from '@mui/material/Typography';
import React, { memo } from 'react';
import { Paths } from 'config/site-paths';
import { useRouter } from 'next/router';
import { CategoryCardImageWrapper, CategoryCardWrapper } from './card.styles';

interface CategoryCardProps {
  label?: string;
  image?: { alt?: string | null; url: string } | null;
  slug: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  label,
  image,
  slug,
}) => {
  const router = useRouter()
  return (
    <CategoryCardWrapper>
      <CategoryCardImageWrapper>
        <Image layout="fixed" width={96} height={96} src={image?.url || ""} alt={image?.alt || ""} />
      </CategoryCardImageWrapper>
      <Typography
        sx={{":hover":{
          color: "#FEEE00",
        }}}
        onClick={() =>
          router.push(`${Paths.CATEGORY_PRODUCTS}${slug}`)
        } variant="subtitle2">{label}</Typography>
    </CategoryCardWrapper>
  );
}
export default memo(CategoryCard);
