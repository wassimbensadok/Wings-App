package com.wings.wingsuserservice.models;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
public class Delivery extends User{

	private String cinFront;
	private String cinBack;
	private String filename;
	@Size(max = 8)
	private String cin;
	@Size(max = 30)
	private String account_holder ;
	@Size(max = 30)
	private String bank_name ;
	@Size(max = 30)
	private String agency_name ;
	@Size(max = 30)
	private String agency_city ;
	@Size(max = 30)
	private String rib ;

	@Transient
	private String cinFrontURL;
	@Transient
	private String cinbackURL;

	public Delivery(String firstName, String lastName, String email, String governorate, String address, String password, String phone) {
		super(firstName, lastName, email, governorate, address, password, phone);
	}

	public Delivery(String firstName, String lastName, String email, String governorate, String address, String password, String phone, String filename, String filetype, byte[] filedata, String cin, String account_holder, String bank_name, String agency_name, String agency_city, String rib) {
		super(firstName, lastName, email, governorate, address, password, phone);
		this.filename = filename;
		this.cin = cin;
		this.account_holder = account_holder;
		this.bank_name = bank_name;
		this.agency_name = agency_name;
		this.agency_city = agency_city;
		this.rib = rib;
	}

	public Delivery(String firstName, String lastName, String email, String governorate, String address, String password, String phone, String cin, String account_holder, String bank_name, String agency_name, String agency_city, String rib) {
		super(firstName, lastName, email, governorate, address, password, phone);
		this.cin = cin;
		this.account_holder = account_holder;
		this.bank_name = bank_name;
		this.agency_name = agency_name;
		this.agency_city = agency_city;
		this.rib = rib;
	}

	public Delivery() {

	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public String getCin() {
		return cin;
	}

	public void setCin(String cin) {
		this.cin = cin;
	}

	public String getAccount_holder() {
		return account_holder;
	}

	public void setAccount_holder(String account_holder) {
		this.account_holder = account_holder;
	}

	public String getBank_name() {
		return bank_name;
	}

	public void setBank_name(String bank_name) {
		this.bank_name = bank_name;
	}

	public String getAgency_name() {
		return agency_name;
	}

	public void setAgency_name(String agency_name) {
		this.agency_name = agency_name;
	}

	public String getAgency_city() {
		return agency_city;
	}

	public void setAgency_city(String agency_city) {
		this.agency_city = agency_city;
	}

	public String getRib() {
		return rib;
	}

	public void setRib(String rib) {
		this.rib = rib;
	}

	public String getCinFront() {
		return cinFront;
	}

	public void setCinFront(String cinFront) {
		this.cinFront = cinFront;
	}

	public String getCinBack() {
		return cinBack;
	}

	public void setCinBack(String cinBack) {
		this.cinBack = cinBack;
	}

	public String getCinFrontURL() {
		return cinFrontURL;
	}

	public void setCinFrontURL(String cinFrontURL) {
		this.cinFrontURL = cinFrontURL;
	}

	public String getCinbackURL() {
		return cinbackURL;
	}

	public void setCinbackURL(String cinbackURL) {
		this.cinbackURL = cinbackURL;
	}
}
