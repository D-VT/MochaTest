**bug1：当bank_country_code 为AU时，account_number位数不在对应区间，response与预期不符合。**  
复现 post   
{  
	"payment_method": "SWIFT",  
	"bank_country_code": "AU",  
	"account_name": "acname1234",  
	"account_number": "1234567890",     
	"swift_code": "ABCDAUGH",  
	"bsb": "12345B"  
}  
error应为"Length of account_number should be between 7 and 11 when bank_country_code is 'AU'"。  
实际上为"Length of account_number should be between 7 and 11 when bank_country_code is 'US'"。  

**bug2: 当bank_country_code 为CN时， account_number位数为20时，response状态码应为200，实际却为400。**  
复现 post  
{  
	"payment_method": "LOCAL",  
  "bank_country_code": "CN",  
	"account_name": "acname1234",  
	"account_number": "12345678912345678912"  
}  
status_code应为200，实际为 400。  

**bug3: 当bank_country_code 为CN时， account_number位数为7位时，response状态码应为400，实际却为200。**  
复现 post  
{
	"payment_method": "SWIFT",  
  "bank_country_code": "CN",  
	"account_name": "acname1234",  
	"account_number": "1234567",   
	"swift_code": "ABCDCNGH"  
}  
status_code应为400，实际为 200。  

**bug4: 当bank_country_code 为US时，缺少aba值时，response状态码应为400，实际却为200.**  
复现 post  
{  
	"payment_method": "SWIFT",  
  "bank_country_code": "US",  
	"account_name": "acname1",  
	"account_number": "12345678912345678",        
  "swift_code": "ABCDUSGH"  
}  
status_code应为400，实际为 200。  
