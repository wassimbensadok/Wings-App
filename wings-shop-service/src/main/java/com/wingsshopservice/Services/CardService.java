package com.wingsshopservice.Services;

import com.sun.jnlp.FileSaveServiceImpl;
import com.wingsshopservice.Controller.CardController;
import com.wingsshopservice.DTO.CardDTO;
import com.wingsshopservice.Model.Card;
import com.wingsshopservice.Repository.CardRepository;
import com.wingsshopservice.StorageService.FilesStorageService;
import com.wingsshopservice.StorageService.FilesStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.util.List;
import java.util.Optional;

@Service
public class CardService {

    @Autowired
    CardRepository cardRepository;

    @Autowired
    FilesStorageService storageService;

    public Optional<Card> getCardByUser(long id){

        Optional<Card> card = cardRepository.findByUserProId(id);
        String url = null;
        if(card.isPresent()){
                url = MvcUriComponentsBuilder
                        .fromMethodName(CardController.class, "getFile", card.get().getCommercial_register()).build().toString();

                card.get().setCommercial_register(url);


        }
        return card;
    }

    public long getCardId(long id){
        return cardRepository.findByUserProId(id).get().getId();
    }

    public Card CreateCard(CardDTO cardDTO, MultipartFile file) {
        if(cardDTO.getId() != 0){
            Optional<Card> cardOptional = cardRepository.findById(cardDTO.getId());
            if (cardOptional.isPresent()) {
                Card card = cardOptional.get();
                card.setShopName(cardDTO.getShopName());
                card.setType(cardDTO.getType());
                card.setWebSite(cardDTO.getWebSite());
                if(card.getCommercial_register() != file.getOriginalFilename() ){
                    storageService.delete(card.getCommercial_register());
                    storageService.save(file);
                    card.setCommercial_register(file.getOriginalFilename());
                }
                return cardRepository.save(card);
            }
        }
            Card card = new Card();
            card.setShopName(cardDTO.getShopName());
            card.setType(cardDTO.getType());
            card.setCommercial_register(file.getOriginalFilename());
            card.setWebSite(cardDTO.getWebSite());
            card.setUserProId(cardDTO.getUserProId());
            storageService.save(file);
            return cardRepository.save(card);

    }
}
