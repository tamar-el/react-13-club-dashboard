// App - keeps all the state (useState) and builds the page from the components.
import { initialMembers, initialTasks } from './data.js'
import styles from './App.module.css'
import Footer from './components/Footer/Footer.jsx'
import Header from './components/Header/Header.jsx'
import MembersList from './components/MembersList/MembersList.jsx'
import FilterBar from './components/FilterBar/FilterBar.jsx'
import { useState } from 'react';
import TasksPanel from './components/TasksPanel/TasksPanel.jsx'
import Notice from './components/Notice/Notice.jsx'
export default function App() {
  const [members, setMembers] = useState(initialMembers);
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [layout, setLayout] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");

  // TODO: state (useState):
  //   members          - start with initialMembers
  //   tasks            - start with initialTasks
  //   selectedMemberId - start with null
  //   showOnlyActive   - start with false
  //   layout           - start with "list"

  function handleToggleActive() {
    setShowOnlyActive(prev => !prev);
  }

  function handleLayoutChange(mode){
    setLayout(mode)
  }
  // TODO: compute the members to show, the selected member and their tasks

  const selectedMember = members.find(
    member => member.id === selectedMemberId
  ) || null;

   const filteredMembers = members.filter(member => {

    const matchesActive =
      !showOnlyActive || member.isActive;

    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesActive && matchesSearch;
  });
  const selectedTasks = selectedMember
    ? tasks.filter(task => task.assignedTo === selectedMember.id)
    : [];

  function handleToggleTask(taskId) {
  setTasks(prevTasks =>
    prevTasks.map(task =>
      task.id === taskId
        ? { ...task, done: !task.done }
        : task
    )
  );
} 


  // TODO: render: Header, FilterBar, Notice (only when needed), MembersList, TasksPanel, Footer

  return <div className={styles.app}>
    <Header></Header>
    <FilterBar 
    showOnlyActive={showOnlyActive}
    onToggleActive={handleToggleActive} 
    layout={layout} 
    onLayoutChange={handleLayoutChange} 
    searchTerm={searchTerm}
    onSearchChange={setSearchTerm}
    ></FilterBar>

    {selectedMember && !selectedMember.isActive && (
        <Notice type="warning">
          This member is inactive.
        </Notice>
    )}
    <div className={styles.content}>
    <MembersList 
      members={filteredMembers}
      layout={layout}
      selectedMemberId={selectedMemberId}
      onSelect={setSelectedMemberId}
    ></MembersList>
    <TasksPanel 
      member={selectedMember}
      tasks={selectedTasks}
      onToggleTask={handleToggleTask}
    ></TasksPanel>
    </div>
    <Footer></Footer>


  </div>
}
