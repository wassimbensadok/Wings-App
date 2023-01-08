package com.wingsshopservice.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wingsshopservice.DTO.CardDTO;
import com.wingsshopservice.Model.Card;
import com.wingsshopservice.Services.CardService;
import com.wingsshopservice.StorageService.FilesStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class CardController {

    @Autowired
    CardService cardService;

    @Autowired
    FilesStorageService storageService;

    @GetMapping("/getCard/{id}")
    public Optional<Card> getCard(@PathVariable("id") long id) {

        return cardService.getCardByUser(id);
    }

    @GetMapping("/getCardByUserId/{id}")
    public long getCardIdByUserId(@PathVariable("id") long id) {
        return cardService.getCardId(id);
    }

    @RequestMapping(value = "/Card", method = RequestMethod.POST,
            consumes = {MediaType.APPLICATION_JSON_VALUE,MediaType.MULTIPART_FORM_DATA_VALUE})
    public Card Card (@RequestParam("file") MultipartFile file, @RequestParam("card") String cardDTO) throws JsonProcessingException {

            CardDTO card = new ObjectMapper().readValue(cardDTO, CardDTO.class);
         return    cardService.CreateCard(card,file);

    }



    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storageService.load(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
}
