package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Address;
import com.ecommerce.project.model.User;
import com.ecommerce.project.payload.AddressDTO;
import com.ecommerce.project.repository.AddressRepository;
import com.ecommerce.project.repository.UserRepository;
import com.ecommerce.project.util.AuthUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    AuthUtil authUtil;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    AddressRepository addressRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public AddressDTO createAddress(AddressDTO addressDTO, User user) {
        Address address = modelMapper.map(addressDTO ,Address.class);

        List<Address> addressList = user.getAddress();
        addressList.add(address);
        user.setAddress(addressList);

        address.setUser(user);
        Address savedAddress = addressRepository.save(address);

        return modelMapper.map(savedAddress , AddressDTO.class);
    }

    @Override
    public List<AddressDTO> getAddresses() {
        List<Address> addressList = addressRepository.findAll();
        List<AddressDTO> addressDTOList = addressList.stream()
                .map(address -> modelMapper.map(address , AddressDTO.class))
                .toList();

        return addressDTOList;
    }

    @Override
    public AddressDTO getAddressesById(Long addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address" , "addressId" , addressId));

        return modelMapper.map(address , AddressDTO.class);
    }

    @Override
    public List<AddressDTO> getUserAddresses(User user) {
        List<Address> addressList = user.getAddress();
        List<AddressDTO> addressDTOList = addressList.stream()
                .map(address -> modelMapper.map(address , AddressDTO.class))
                .toList();

        return addressDTOList;
    }

    @Override
    public AddressDTO updateAddress(Long addressId,AddressDTO addressDTO) {
        Address addressFromDB = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address" , "addressId" , addressId));

        addressFromDB.setCity(addressDTO.getCity());
        addressFromDB.setState(addressDTO.getState());
        addressFromDB.setPincode(addressDTO.getPincode());
        addressFromDB.setCountry(addressDTO.getCountry());
        addressFromDB.setStreet(addressDTO.getStreet());
        addressFromDB.setBuildingName(addressDTO.getBuildingName());

        Address updatedAddress = addressRepository.save(addressFromDB);
        User user = addressFromDB.getUser();
        user.getAddress().removeIf(address -> address.getAddressID().equals(addressId));
        user.getAddress().add(updatedAddress);
        userRepository.save(user);

        return modelMapper.map(updatedAddress , AddressDTO.class);
    }

    @Override
    public String deleteAddress(Long addressId) {
        Address addressFromDB = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address" , "addressId" , addressId));

        User user = addressFromDB.getUser();
        user.getAddress().removeIf(address -> address.getAddressID().equals(addressId));
        userRepository.save(user);

        addressRepository.delete(addressFromDB);
        return "Address Deleted Successfully with Address ID: " + addressId;
    }
}
