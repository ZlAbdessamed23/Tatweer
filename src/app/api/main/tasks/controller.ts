import prisma from "@/lib/prisma/prismaClient";
import { AddTaskData, TaskResult, TasksResult } from "@/app/api/main/tasks/types";


import { throwAppropriateError } from "@/lib/error-handler/throwError";


export async function addTask(
  data: AddTaskData,
  
  userId: string,
 
): Promise<TaskResult> {
  try {
    return await prisma.$transaction(async (prisma) => {
      

      // Parallel verification of hotel and user
      

      

      

      
      // Create task
      const createdTask = await prisma.task.create({
        data: {
          taskTitle: data.taskTitle,
          taskDescription: data.taskDescription,
         taskManagerId: data.taskManager,
            taskAdminId: userId,
            taskDueDate: data.taskDueDate,
            taskStatus: data.taskStatus,
          
         
        
          
        },
        select:{
            taskId: true,
            taskTitle: true,
            taskDescription: true,
            taskManager: {
                select:{
                managerId: true,
                managerFirstName: true,
                
                }
            }
        }});

     
      return { Task: createdTask };
    });
  } catch (error) {
    throwAppropriateError(error);
  }
}

export async function getAllTasks(
  userId: string,
  
 
  
): Promise<TasksResult> {
  try {
    

    const tasks = await prisma.task.findMany({
      where: {
        taskAdminId:userId,
        // Use ternary to set the correct ID field based on role
       
      },
      select:{
        taskId: true,
        taskTitle: true,
        taskDescription: true,
        taskManager: {
            select:{
            managerId: true,
            managerFirstName: true,
            
            }
        }
    }
    });

    return { Tasks: tasks };
  } catch (error) {
    throwAppropriateError(error);
  }
}
