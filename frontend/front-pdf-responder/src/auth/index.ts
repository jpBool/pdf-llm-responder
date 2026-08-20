"use server"
import { supabase } from '@/supabase/client/initializeClient';
import { insertNewUserDb } from '@/supabase/teste';
import argon2 from 'argon2';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

interface CustomPayload extends JWTPayload {
  id: number;
  email: string;
}

// Creates JWT token
export async function createToken(payload: CustomPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(SECRET_KEY);
}

// Verifyes JWT token
export async function verifyToken(token: string): Promise<CustomPayload> {
  const { payload } = await jwtVerify(token, SECRET_KEY);
  return payload as CustomPayload;
}

// Creates password hash
export async function hashPassword(cleanPassword : string){
    return await argon2.hash(cleanPassword);
}

// Verifyes if password matches with saved hash password
export async function verifyPassword(password : string, databasePassword: string){
    return await argon2.verify(databasePassword, password);
}

// Logup user account
export async function userLogUp(logupData: FormData){

    if(logupData.get('password') !== logupData.get('passwordConfirmation')){
        console.log("Confirmation password didn't match!!");
        return false;
    }

    const hashedPassoword = await hashPassword(logupData.get('password'));

    const res = await insertNewUserDb({
        email : logupData.get('email'),
        first_name : logupData.get('firstName'),
        last_name : logupData.get('lastName'),
        username: logupData.get('username'),
        password : hashedPassoword
    });

    console.log(res);

    if(!res){
        return false;
    }

    return true;

}

// Login to user account
export async function userLogin(loginData : FormData) {

    const { data, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", loginData.get('email'))    
        .single();

    if(error){
        console.log(error.message);
        return error;
    }
    if(!data){
        console.log("usuário não encontrado!!");
        return null;
    }

    if(await verifyPassword(loginData.get('passoword'),data.password)){
        console.log("Senha inválida!!");
        return null;
    }
    
    const token = createToken({ id : data.number , email: data.email });

    return token;
}

