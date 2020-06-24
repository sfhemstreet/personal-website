
/**
 * - check for valid input
 * @param input - input to validate
 * @param type - 'plain' 'email' 'special'
 * @returns boolean
 */
export const regexCheck = (input: string, type = '') => {
  let regex = new RegExp(/^[a-zA-Z0-9_.-]*$/);
  switch(type){
      case 'plain':
          regex = new RegExp(/^[a-z A-Z0-9_.-]*$/) ;
          break;
      case 'email':
          regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
          break;
      case 'special':
          regex = new RegExp(/^[$!@&#%?'":,^a-z A-Z0-9_.-]*$/);                                 
          break;
      default:
          regex = new RegExp(/^[a-zA-Z0-9_.-]*$/);
  }
  return regex.test(input);
}

/**
* check for valid email
* @param email 
* @returns boolean
*/
export const checkEmail = (email: string) => {
  if (!email) return false;

  return regexCheck(email, 'email');
}

/**
* check for valid input, letters and numbers including certain special chars 
* - $!@&#%?'":,_.-
* @param input input to validate
* @returns boolean
*/
export const checkSpecial = (input: string) => {
  if (!input) return false;

  return regexCheck(input, 'special')
}