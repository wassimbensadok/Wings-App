package com.wings.wingsuserservice.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wings.wingsuserservice.Mailer.Mail;
import com.wings.wingsuserservice.Mailer.SubscribeForm;
import com.wings.wingsuserservice.StorageService.FilesStorageService;
import com.wings.wingsuserservice.models.*;
import com.wings.wingsuserservice.payload.request.LoginRequest;
import com.wings.wingsuserservice.payload.request.SignupRequest;
import com.wings.wingsuserservice.payload.response.JwtResponse;
import com.wings.wingsuserservice.payload.response.MessageResponse;
import com.wings.wingsuserservice.repository.DeliveryRepository;
import com.wings.wingsuserservice.repository.RoleRepository;
import com.wings.wingsuserservice.repository.UserRepository;
import com.wings.wingsuserservice.security.jwt.JwtUtils;
import com.wings.wingsuserservice.security.services.UserDetailsImpl;
import com.wings.wingsuserservice.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  DeliveryRepository deliveryRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @Autowired
  FilesStorageService storageService;

  @Autowired
  UserService userService;

  @Value("${user.app.password}")
  private String password;

  @PostMapping("/SocilaSignin")
  public ResponseEntity<?> SocialAuthenticateUser(@Valid @RequestBody SignupRequest signUpRequest) {

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      Authentication authentication = authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(signUpRequest.getEmail(), password));

      SecurityContextHolder.getContext().setAuthentication(authentication);
      String jwt = jwtUtils.generateJwtToken(authentication);

      UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
      List<String> roles = userDetails.getAuthorities().stream()
              .map(item -> item.getAuthority())
              .collect(Collectors.toList());

      return ResponseEntity.ok(new JwtResponse(jwt,
              userDetails.getId(),
              userDetails.getFirstname(),
              userDetails.getLastname(),
              userDetails.getEmail(),
              userDetails.getIsActive(),
              roles));
    }


    // Create new user's account
    User user = new User(signUpRequest.getFirstname(),
            signUpRequest.getLastname(),
            signUpRequest.getEmail(),
            signUpRequest.getGovernorate(),
            signUpRequest.getAddress(),
            encoder.encode(password),
            signUpRequest.getPhone());

    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
          case "admin":
            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);

            break;
          case "delivery":
            Role modRole = roleRepository.findByName(ERole.ROLE_DELIVERY)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(modRole);

            break;
          default:
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        }
      });
    }

    user.setRoles(roles);
    userRepository.save(user);

    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(signUpRequest.getEmail(), password));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    List<String> roless = userDetails.getAuthorities().stream()
            .map(item -> item.getAuthority())
            .collect(Collectors.toList());

    return ResponseEntity.ok(new JwtResponse(jwt,
            userDetails.getId(),
            userDetails.getFirstname(),
            userDetails.getLastname(),
            userDetails.getEmail(),
            userDetails.getIsActive(),
            roless));


  }

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    List<String> roles = userDetails.getAuthorities().stream()
            .map(item -> item.getAuthority())
            .collect(Collectors.toList());

    return ResponseEntity.ok(new JwtResponse(jwt,
            userDetails.getId(),
            userDetails.getFirstname(),
            userDetails.getLastname(),
            userDetails.getEmail(),
            userDetails.getIsActive(),
            roles));
  }

  @PostMapping("/user-signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) throws MessagingException, IOException {

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity
              .badRequest()
              .body(new MessageResponse("Error: Email is already in use!"));
    }

    Random rnd = new Random();
    int number = rnd.nextInt(999999);
    // Create new user's account
    User user = new User(signUpRequest.getFirstname(),
            signUpRequest.getLastname(),
            signUpRequest.getEmail(),
            signUpRequest.getGovernorate(),
            signUpRequest.getAddress(),
            encoder.encode(signUpRequest.getPassword()),
            signUpRequest.getPhone());
    user.setVerificationCode(number);

    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
          case "admin":
            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);

            break;
          case "delivery":
            Role modRole = roleRepository.findByName(ERole.ROLE_DELIVERY)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(modRole);

            break;
          default:
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        }
      });
    }

    user.setRoles(roles);
    userRepository.save(user);
    Mail mailer = new Mail();
    SubscribeForm subscribeForm = new SubscribeForm();
    subscribeForm.setName(signUpRequest.getFirstname()+" "+ signUpRequest.getLastname());
    subscribeForm.setEmail(signUpRequest.getEmail());
    subscribeForm.setLink("http://localhost:4200/email_verification?email="+signUpRequest.getEmail()+"&code="+number);
    mailer.send(subscribeForm,"confirm");
    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));

  }

  @PostMapping("/admin-signup")
  public ResponseEntity<?> registerAdmin(@Valid @RequestBody SignupRequest signUpRequest) throws MessagingException, IOException {

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity
              .badRequest()
              .body(new MessageResponse("Error: Email is already in use!"));
    }

    Random rnd = new Random();
    int number = rnd.nextInt(999999);
    // Create new user's account
    User user = new User(signUpRequest.getFirstname(),
            signUpRequest.getLastname(),
            signUpRequest.getEmail(),
            signUpRequest.getGovernorate(),
            signUpRequest.getAddress(),
            encoder.encode(signUpRequest.getPassword()),
            signUpRequest.getPhone());
    user.setVerificationCode(number);
    user.setAccountVrf(true);
    user.setActive(true);

    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();


      strRoles.forEach(role -> {
        switch (role) {
          case "ROLE_ADMIN":
            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);

            break;
          case "ROLE_AGENT":
            Role modRole = roleRepository.findByName(ERole.ROLE_AGENT)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(modRole);

            break;
          default:
            Role userRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        }
      });


    user.setRoles(roles);
    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("admin registered successfully!"));

  }

  @PostMapping("/userPro-signup")
  public ResponseEntity<?> registerUserPro(@Valid @RequestBody SignupRequest signUpRequest) throws MessagingException, IOException {

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity
              .badRequest()
              .body(new MessageResponse("Error: Email is already in use!"));
    }
    Random rnd = new Random();
    int number = rnd.nextInt(999999);
    // Create new user's account
    UserPro user = new UserPro();
    user.setFirstName(signUpRequest.getLastname());
    user.setLastName(signUpRequest.getLastname());
    user.setTax_num(signUpRequest.getTax_num());
    user.setEstablishment(signUpRequest.getEstablishment());
    user.setEmail(signUpRequest.getEmail());
    user.setGovernorate(signUpRequest.getGovernorate());
    user.setAddress(signUpRequest.getAddress());
    user.setPassword(encoder.encode(signUpRequest.getPassword()));
    user.setPhone(signUpRequest.getPhone());
    user.setVerificationCode(number);


    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_USER_PRO)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
          case "userPro":
            Role modRole = roleRepository.findByName(ERole.ROLE_USER_PRO)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(modRole);

            break;
          default:
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        }
      });
    }

    user.setRoles(roles);
    User users = userRepository.save(user);
   /* Mail mailer = new Mail();
    SubscribeForm subscribeForm = new SubscribeForm();
    subscribeForm.setName(signUpRequest.getFirstname()+" "+ signUpRequest.getLastname());
    subscribeForm.setEmail(signUpRequest.getEmail());
    subscribeForm.setLink("http://localhost:4200/email_verification?email="+signUpRequest.getEmail()+"&code="+number);
    mailer.send(subscribeForm,"confirm");*/
    return ResponseEntity.ok(new MessageResponse(users.getId().toString()));

  }

  @PostMapping(value="/delivery-signup", consumes = {MediaType.APPLICATION_JSON_VALUE,MediaType.MULTIPART_FORM_DATA_VALUE})
  public ResponseEntity<?> registerDelivery(@RequestParam("file") MultipartFile file,@RequestParam("fileII") MultipartFile fileII,@Valid @RequestParam("user") String user) throws IOException, MessagingException {
    SignupRequest signUpRequest = new ObjectMapper().readValue(user, SignupRequest.class);
    if (deliveryRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity
              .badRequest()
              .body(new MessageResponse("Error: Email is already in use!"));
    }
    Random rnd = new Random();
    int number = rnd.nextInt(999999);
    // Create new user's account
    Delivery delivery = new Delivery(signUpRequest.getFirstname(),
            signUpRequest.getLastname(),
            signUpRequest.getEmail(),
            signUpRequest.getGovernorate(),
            signUpRequest.getAddress(),
            encoder.encode(signUpRequest.getPassword()),
            signUpRequest.getPhone(),
            signUpRequest.getCin(),
            signUpRequest.getAccount_holder(),
            signUpRequest.getBank_name(),
            signUpRequest.getAgency_name(),
            signUpRequest.getAgency_city(),
            signUpRequest.getRib());
    delivery.setCinFront(file.getOriginalFilename());
    delivery.setCinBack(fileII.getOriginalFilename());
    delivery.setVerificationCode(number);

    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
          case "admin":
            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);

            break;
          case "delivery":
            Role modRole = roleRepository.findByName(ERole.ROLE_DELIVERY)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(modRole);

            break;
          default:
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        }
      });
    }

    delivery.setRoles(roles);
    userRepository.save(delivery);
    storageService.save(file);
    storageService.save(fileII);
    Mail mailer = new Mail();
    SubscribeForm subscribeForm = new SubscribeForm();
    subscribeForm.setName(signUpRequest.getFirstname()+" "+ signUpRequest.getLastname());
    subscribeForm.setEmail(signUpRequest.getEmail());
    subscribeForm.setLink("http://localhost:4200/email_verification?email="+signUpRequest.getEmail()+"&code="+number);
    mailer.send(subscribeForm,"confirm");
    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));

  }

  @GetMapping(path = "/confirm")
  public ResponseEntity<?> confirm(@RequestParam("email") String email,@RequestParam("code") String code) {
    Optional<User> userOptional = userRepository.findByEmail(email);
    User user = userOptional.get();
    if (user.isAccountVrf() == true) {
      return ResponseEntity.ok(new MessageResponse("email déjà confirmé!"));
    }
    if (!code.equals(String.valueOf(user.getVerificationCode()))) {
      return ResponseEntity.ok(new MessageResponse("code introuvable!"));
    }
    if (code.equals(String.valueOf(user.getVerificationCode()))) {
      user.setAccountVrf(true);
      Set<Role> roleSet = new HashSet<>();
      roleSet = user.getRoles();
      System.out.println(roleSet.size());
      List<String> roles = user.getRoles().stream()
              .map(item -> item.getName().name())
              .collect(Collectors.toList());
      System.out.println(roles.get(0));
      if (roleSet.size() == 1 && roles.get(0).equals("ROLE_USER")) {
        user.setActive(true);
      }
      user.setAccountVrf(true);
      userRepository.save(user);
      return ResponseEntity.ok(new MessageResponse("confirmeé!"));
    }
    return ResponseEntity.ok(new MessageResponse("no confirméé!"));
  }
}



