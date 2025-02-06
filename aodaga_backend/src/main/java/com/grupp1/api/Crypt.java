package com.grupp1.api;

import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class Crypt {

  public static String decrypt(String cipherText,
      String ivstring) throws BadApiInputException {

    byte[] lol = hexStringToByteArray("000102030405060708090a0b0c0d0e0f");
    SecretKey key = new SecretKeySpec(lol, "AES");

    byte[] ivbytes = hexStringToByteArray(ivstring);
    IvParameterSpec iv = new IvParameterSpec(ivbytes);
    //cipherText = "lol";

    try {
      Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
      cipher.init(Cipher.DECRYPT_MODE, key, iv);
      byte[] plainText = cipher.doFinal(Base64.getDecoder()
          .decode(cipherText));
      System.out.println("decrypted: " + new String(plainText));
      return new String(plainText);
    } catch (Exception e) {
      e.printStackTrace();
      throw new BadApiInputException("Bad Crypt");
    }
  }

  private static byte[] hexStringToByteArray(String s) {
    int len = s.length();
    byte[] data = new byte[len / 2];
    for (int i = 0; i < len; i += 2) {
      data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
          + Character.digit(s.charAt(i + 1), 16));
    }
    return data;
  }

}
