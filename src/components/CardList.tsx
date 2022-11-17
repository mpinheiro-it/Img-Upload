import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE

  // TODO SELECTED IMAGE URL STATE
  const [selectedImage, setSelectedImage] = useState('')

  // TODO FUNCTION HANDLE VIEW IMAGE


  return (
    <>
      {<SimpleGrid columns={3} spacing={'40px'}>
          {cards.map(item => {
            return (
              <Card
              key={item.id}
              data={{
                ...item,
                url: item.url  
              }}
              viewImage={() => '' }
              />
            )
          })}
        
      </SimpleGrid>}

      {/* TODO MODALVIEWIMAGE */}
    </>
  );
}
