package com.wings.wingsofferservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wings.wingsofferservice.DTO.DemandDTO;
import com.wings.wingsofferservice.Models.Demand;
import com.wings.wingsofferservice.Service.DemandeServcie;
import com.wings.wingsofferservice.StorageService.FilesStorageService;
import com.wings.wingsofferservice.repository.DemandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class DemandController {



	@Autowired
	DemandeServcie demandeServcie;

	@Autowired
	FilesStorageService storageService;

	@GetMapping("/GetAllDemand")
	public List<Demand> getAllDemand() {
			return  demandeServcie.getAllDemand();
	}



	@GetMapping("/GetDemandById/{id}")
	public Optional<Demand> getDemandById(@PathVariable("id") long id) throws IOException {
		return demandeServcie.getDemandById(id);
	}

	@GetMapping("/GetDemandByUserId/{id}")
	public List<Demand> GetDemandByUserId(@PathVariable("id") long id) throws IOException {
		return demandeServcie.getDemandByUserId(id);
	}

	/*@GetMapping("/GetDemandByFilter")
	public Optional<Demand> getDemandByFilter(@RequestBody DemandFilterDTO filterDTO) {
		return demandeServcie.getDemandByFilter(filterDTO);
	}*/

	//"multipart/form-data",
	@RequestMapping(value = "/AddDemand", method = RequestMethod.POST,
			consumes = {MediaType.APPLICATION_JSON_VALUE,MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<?> AddDemand (@RequestParam("file") MultipartFile file,@RequestParam("demand") String demandDTO){
		try{
			DemandDTO demand = new ObjectMapper().readValue(demandDTO, DemandDTO.class);
			demandeServcie.AddDemand(demand,file);
			return new ResponseEntity<>("Demand registered successfully", HttpStatus.CREATED);
		}catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/AddDemand2")
	public ResponseEntity<?> AddDemandII (@RequestBody DemandDTO demandDTO){
		try{
			//DemandDTO demand = new ObjectMapper().readValue(demandDTO, DemandDTO.class);
			demandeServcie.AddDemandII(demandDTO);
			return new ResponseEntity<>("Demand registered successfully", HttpStatus.CREATED);
		}catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/UpdateDemandById/{id}")
	public Demand updateDemand(@PathVariable("id") long id,@RequestParam("file") MultipartFile file,@RequestParam("demand") String demandDTO) {
		try{
			DemandDTO demand = new ObjectMapper().readValue(demandDTO, DemandDTO.class);
			return demandeServcie.UpdateDemand(id,demand,file);
		}catch (Exception e) {
			return null;
		}
	}


	@DeleteMapping("/DeleteDemandById/{id}")
	public ResponseEntity<HttpStatus> deleteDemand(@PathVariable("id") long id) {
		try {
				demandeServcie.DeleteDemandById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/DeleteAllDemand")
	public ResponseEntity<HttpStatus> deleteAllDemand() {
		try {
			demandeServcie.DeleteAllDemand();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/files/{filename:.+}")
	public ResponseEntity<Resource> getFile(@PathVariable String filename) {
		Resource file = storageService.load(filename);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
	}

}
