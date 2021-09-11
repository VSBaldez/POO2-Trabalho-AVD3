import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, StyleSheet, TextInput, Platform, FlatList, TouchableOpacity, Image } from 'react-native'
import { Button } from '../components/Button'
import { SkillCard } from '../components/SkillCard'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface ICadastroData {
  id: string;
  nome: string;
  email: string;
  telefone: string;
}

export function Home(){
  const [newNome, setNewNome] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newTelefone, setNewTelefone] = useState('')
  //const [myCadastros, setMyCadastros] = useState<ICadastroData[]>([])
  
  const [myCadastros, setMyCadastros] = useState<ICadastroData[]>([]);

  useEffect(() => {
    async function loadData(){
      const storagedCadastros = await AsyncStorage.getItem('@meuscadastros:cadastros')
      if(storagedCadastros){
        setMyCadastros(JSON.parse(storagedCadastros))
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    async function saveData(){
      await AsyncStorage.setItem('@meuscadastros:cadastros', JSON.stringify(myCadastros))
    }
    saveData()
  }, [myCadastros])


  const [greeting, setGreeting] = useState('')

  const storage = (value : string)=> {
    //AsyncStorage.setItem('cadastros', value)
  }
  
  const getStorage = async ()=>{
    //const storageValues = await AsyncStorage.getItem('cadastros')
  }

  function handleAddNewSkill(){
    const data = {
      id: String(new Date().getTime()),
      nome: newNome,
      email: newEmail,
      telefone: newTelefone
    }
    setMyCadastros([...myCadastros, data])
    //storage(JSON.stringify([...myCadastros, data]))
    setNewNome('')
    setNewEmail('')
    setNewTelefone('')
  }

  function handleRemoveSkill(id: string){
    async function removeData(){
      const storagedCadastros = await AsyncStorage.getItem('@meuscadastros:cadastros')
      if(storagedCadastros){
        const alteredCadastro = setMyCadastros(JSON.parse(storagedCadastros).filter(function(e : ICadastroData){
          return e.id !== id

      }))

      AsyncStorage.setItem('@meuscadastros:cadastros', JSON.stringify(alteredCadastro));

      }
    }
    removeData()
    //setMyCadastros(myCadastros.filter(cadastro => cadastro.id != id))
  }

  useEffect(() =>{
    const currentHour = new Date().getHours();
    if(currentHour >= 5 && currentHour < 12){
      setGreeting('Bom dia!')
    } else if(currentHour >= 12 && currentHour <18){
      setGreeting('Bos tarde!')
    } else {
      setGreeting('Bos noite!')
    }
  }, [])

  return (
    <>
      <ScrollView horizontal={false} style={styles.container}>
        <Text style={styles.title}>Bem-vindo, Victor S. Baldez.</Text>
        <Text style={styles.greetings}>{greeting}</Text>
        <Image style={{width:80, height:80, position:'relative', marginBottom:30, left:'50%', transform: [
        { translateX: -40 },
        { translateY: 10},
      ]}} source={require('../images/user.png')} />
      <Text style={[styles.titleSimple, {marginVertical: 0}]}>
          Formulário de Cadastro
        </Text>
        <TextInput style={styles.input} placeholder='Nome Completo' value={newNome} placeholderTextColor='#555' onChangeText={value => setNewNome(value)} onSubmitEditing={handleAddNewSkill} />
        <TextInput style={styles.input} placeholder='E-mail' value={newEmail} placeholderTextColor='#555' onChangeText={value => setNewEmail(value)} onSubmitEditing={handleAddNewSkill} />
        <TextInput style={styles.input} placeholder='Telefone' value={newTelefone} placeholderTextColor='#555' onChangeText={value => setNewTelefone(value)} onSubmitEditing={handleAddNewSkill} />
        <Button 
          onPress={handleAddNewSkill} 
          title="Adicionar"
        />
        <Text style={[styles.title, {marginVertical: 20}]}>
          Lista de Cadastros
        </Text>
        <FlatList style={styles.flatList}
        data={myCadastros} 
        keyExtractor={item => item.id} 
        renderItem={({ item }) => (
          //<SkillCard skill={item.name} onPress={()=>handleRemoveSkill(item.id)} />
          <TouchableOpacity onPress={()=>handleRemoveSkill(item.id)} key={item.id} style={styles.buttonSkill}>
              <Text style={styles.textSkill}>
                <Text style={{fontSize: 24}}>{item.nome}{"\n"}</Text>
                <Text style={{fontSize: 20}}>{item.email}{"\n"}</Text>
                <Text style={{fontSize: 16}}>{item.telefone}</Text>
              </Text>
          </TouchableOpacity>
        )}>
        </FlatList>
        {/*
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            mySkills.map((skill) => (
              <TouchableOpacity key={skill.id} style={styles.buttonSkill}>
              <Text style={styles.textSkill}>
                {skill.name}
              </Text>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
        */}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121015',
      paddingHorizontal: 30,
      paddingVertical: 30,
    },
    title: {
      color: '#ffffff',
      fontSize: 20,
      fontWeight: 'bold'
    },
    input: {
      backgroundColor: '#1f1e25',
      color: '#ffffff',
      fontSize: 18,
      padding: Platform.OS == 'ios' ? 15 : 10,
      marginTop: 30,
      borderRadius: 7,
    },
    greetings: {
      color: '#fff',
      fontSize: 15
    },
    buttonSkill: {
      backgroundColor: '#898F9C',
      padding: Platform.OS == 'ios' ? 15 : 10,
      borderRadius: 7,
      alignItems: 'center',
      marginTop: 10
    },
    textSkill: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold'
    },
    flatList: {
      paddingBottom: 50
    },
    titleSimple: {
      color: '#ffffff',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 30
    },
})
/*

Estilização:
Inline.
StyleSheet.
Styled Components.

*/