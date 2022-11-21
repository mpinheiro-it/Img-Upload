import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent       
        maxW={['300px', '500px', '900px']}
        maxH={['350px', '450px', '600px']}        
        borderRadius={8}
      >
        <ModalBody p={0}>
          <Image
            src={imgUrl}
            borderTopRadius={6}
            maxW={['300px', '500px', '900px']}
            maxH={['350px', '450px', '600px']}
          />
        </ModalBody>

        <ModalFooter
          display="block"          
          bg="lightgray"
          alignItems="start"          
        >
          <Link
            href={imgUrl}
            target="_blank"
            fontSize={14}
            textDecor="none"
            _hover={{ color: 'orange' }}
          >
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
