package com.wings.wingsuserservice.Mailer;


import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.Properties;

import javax.mail.*;
import javax.mail.internet.*;


public class Mail {
    private final String PORT = "2525";
    private final String HOST = "smtp.mailtrap.io";
    private final String USERNAME = "d065d186f51cb2";
    private final String PASSWORD = "71da2d39bb65ad";
    private final String EMAIL = "c7bfcb39da-e3324a+1@inbox.mailtrap.io";

    private final boolean AUTH = true;
    private final boolean STARTTLS = true;

    private Multipart multipart;

    public Mail() {
        this.multipart = new MimeMultipart();
    }

    private Multipart getMultipart() {
        return multipart;
    }


    public void send(SubscribeForm subscriber,String type) throws AddressException, MessagingException, IOException {
        Message msg = new MimeMessage(setSession(setProperties()));

        //setAttachment();
        setMessage(subscriber,type);

        msg.setContent(getMultipart());
        msg.setSentDate(new Date());
        msg.setSubject("You're subscribed on newsletter");

        msg.setFrom(new InternetAddress(EMAIL, false));
        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(subscriber.getEmail()));

        Transport.send(msg);
    }

    private void setMessage(SubscribeForm subscriber, String type) throws MessagingException {
        MimeBodyPart message =  new MimeBodyPart();

        EmailForm emailForm = new EmailForm();
        if(type == "confirm") {
            StringBuffer htmlContent = new StringBuffer();
            htmlContent.append(emailForm.ConfirmEmail(subscriber.getName(), subscriber.getLink()));
            message.setContent(htmlContent.toString(), "text/html");

            getMultipart().addBodyPart(message);
        }
    }

    private void setAttachment() throws MessagingException, IOException {
        MimeBodyPart attachment = new MimeBodyPart();

        attachment.attachFile(new File("src/main/resources/static/fine.jpg").getCanonicalPath());

        getMultipart().addBodyPart(attachment);
    }

    private Session setSession(Properties props) {
        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(USERNAME, PASSWORD);
            }
        });
        return session;
    }

    private Properties setProperties() {
        Properties props = new Properties();

        props.put("mail.smtp.port", PORT);
        props.put("mail.smtp.host", HOST);
        props.put("mail.smtp.auth", AUTH);
        props.put("mail.smtp.starttls.enable", STARTTLS);

        return props;
    }
}
