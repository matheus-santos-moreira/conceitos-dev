import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    await api
      .post('projects', {
        title: `Novo projeto ${Date.now()}`,
        owner: 'Matheus Santos',
      })
      .then((response) => {
        const project = response.data;
        setProjects([...projects, project]);
      });
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({item: project}) => (
            <Text style={styles.projects}>{project.title}</Text>
          )}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={handleAddProject}>
          <Text style={styles.buttonText}>Adiconar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },
  projects: {
    color: '#FFF',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
