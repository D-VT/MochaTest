# 需求 :
post http://preview.airwallex.com:30001/bank。
send payload 以下列格式，验证response状态码。
1. payment_method，必填， 值为LOCAL  或者SWIFT；
2. bank_country_code ，必填，值为US AU CN。
3. account_name ，必填，2~10字符长度。
4. account_number，必填， 对应country为US时，字符长度为1至17；对应country为AU，字符长度为6至9；对应country为CN，字符长度为8至20。
5. swift_code ，payment_method = SWIFT时必填， 第5，第6字符需要与country相符合。
6. bsb，country code为 AU时必填，6字符长度。
7. aba, country code 为US时必填，9字符长度。

# 测试用例
## 用例1:
  "payment_method": "LOCAL",  
  "bank_country_code": "US",  
  "account_name": "ac",// name 恰好两字符长度  
  "account_number": "1",// number恰好1字符长度  
  "aba": "12345678a",//刚好9位  
  **response的状态码应为200**  

## 用例2:
  "payment_method": "SWIFT",  
  "bank_country_code": "AU",  
	"account_name": "acname1234",       // name恰好10字符长度  
	"account_number": "123456",         // number恰好6位  
	"swift_code": "ABCDAUGH",         
	"bsb": "12345B",                            //刚好6位  
	**response的状态码应为200**  

## 用例3:
  "payment_method": "SWIFT",       
  "bank_country_code": "CN",  
	"account_name": "acname1",  
	"account_number": "12345678",     //number 恰好8位  
	**response的状态码应为200**  

## 用例4:
  "payment_method": "UNKNOW",  //method 填写错误  
  "bank_country_code": "US",         
	"account_name": "acname1",  
	"account_number": "123",    
	"aba": "12345678A",  
	**response的状态码应为400**  

## 用例5：   
  "payment_method": "LOCAL",  
  "bank_country_code": "CO",   //code  填写错误  
	"account_name": "123456",    
	"account_number": "12345678",                               
	**response的状态码应为400**  

## 用例6：   	
  "payment_method": "LOCAL",  
  "bank_country_code": "CN",  
	"account_name": "a", 	//name太短  
	"account_number": "12345678",  
	**response的状态码应为400**  

## 用例7：  	
  "payment_method": "LOCAL",  
  "bank_country_code": "US",  
	"account_name": "acname12345", //name太长  
	"account_number": "123",  
	"aba": "12345678A",  
	 **response的状态码应为400**  

## 用例8：	
  "payment_method": "LOCAL",  
  "bank_country_code": "US",  
	"account_name": "acname1",  
	"account_number": "", //number太短             
	"aba": "12345678A",  
	**response的状态码应为400**  

## 用例9：	  
  "payment_method": "LOCAL",  
  "bank_country_code": "US",  
	"account_name": "acname1",  
	"account_number": "123456789123456789", //number太长           
	"aba": "12345678A",     
	**response的状态码应为400**  

## 用例10：	
  "payment_method": "SWIFT",  
  "bank_country_code": "US",  
	"account_name": "acname1",  
	"account_number": "12345678912345678",      // number刚好17位  
  "swift_code": "ABCDUSGH",  
	"aba": "12345678A",     
	**response的状态码应为200**  

## 用例11：	
  "payment_method": "SWIFT",  
  "bank_country_code": "AU",  
	"account_name": "acname1234",  
	"account_number": "123456789",  //number刚好9位  
	"swift_code": "ABCDAUGH",  
	"bsb": "12345B",   
	**response的状态码应为200**   

## 用例12：	
  "payment_method": "SWIFT",  
  "bank_country_code": "AU",  
	"account_name": "acname1234",  
	"account_number": "1234567890",  //number太长  
	"swift_code": "ABCDAUGH",  
	"bsb": "12345B",     
	**response的状态码应为400**  

## 用例13：	
  "payment_method": "LOCAL",  
  "bank_country_code": "AU",  
	"account_name": "acname1234",  
	"account_number": "12345",  //number太短  
	"bsb": "12345B",      
	**response的状态码应为400**   

## 用例14：  	
  "payment_method": "LOCAL",  
  "bank_country_code": "CN",  
	"account_name": "acname1234",  
	"account_number": "12345678",  //number刚好8位  
	"swift_code": "ABCDCNGH",  
	**response的状态码应为200**  

## 用例15：	
  "payment_method": "LOCAL",  
  "bank_country_code": "CN",  
	"account_name": "acname1234",    
	"account_number": "12345678912345678912",  //number刚好20位  
	"swift_code": "ABCDCNGH",  
	**response的状态码应为200**  

## 用例16：	
  "payment_method": "LOCAL",  
  "bank_country_code": "CN",  
	"account_name": "acname1234",  
	"account_number": "123456789123456789123",  //number太长  
	"swift_code": "ABCDCNGH",  
	**response的状态码应为400**  

## 用例17：	
  "payment_method": "SWIFT",  
  "bank_country_code": "CN",  
	"account_name": "acname1234",  
	"account_number": "1234567",  //number太短  
	"swift_code": "ABCDCNGH",  
	**response的状态码应为400**

## 用例18：
  "payment_method": "SWIFT",  
  "bank_country_code": "US",  
	"account_name": "acname1",  
	"account_number": "12345678912345678",      
  "swift_code": "ABCDUSGH",   
	**response的状态码应为400**  //aba未填  

## 用例19：	
  "payment_method": "LOCAL",  
  "bank_country_code": "US",  
	"account_name": "acname1",  
	"account_number": "12345678912345678",        
	"aba": "12345678",      //aba长度不为9  
	**response的状态码应为400**  

## 用例20： 
  "payment_method": "SWIFT",  
  "bank_country_code": "AU",  
	"account_name": "acname1234",  
	"account_number": "123456789",    
	"swift_code": "ABCDAUGH",     
	**response的状态码应为400**    //bab未填

## 用例21：   
  "payment_method": "SWIFT",    
  "bank_country_code": "AU",  
	"account_name": "acname1234",  
	"account_number": "123456789",   
	"swift_code": "ABCDAUGH",     
	"bsb": "12345",                     //bab长度不为6  
	**response的状态码应为400**       


## 用例22： 
  "payment_method": "SWIFT",  
  "bank_country_code": "AU",  
	"account_name": "acname1234",  
	"account_number": "123456789",  
	"swift_code": "ABCDUSGH"   //swift code第五第六个字符不为country code  
	"bsb": "123456",                       
	**response的状态码应为400**   
