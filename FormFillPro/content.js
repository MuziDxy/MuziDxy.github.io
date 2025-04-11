// 表单字段识别规则
const FIELD_PATTERNS = {
  // 基础个人信息
  terms: /\b(terms|condition|agree|accept|consent|policy)\b/i,
  firstName: /first[-_\s]*name|fname|givenname|given[-_\s]*name|forename/i,
  lastName: /last[-_\s]*name|lname|surname|family[-_\s]*name|secondname/i,
  // name字段的匹配规则 - 如果没有明确的first/last name字段，就用name
  name: /^name$|^name\s|name$|\sname\s|full[-_\s]*name|your[-_\s]*name|contact[-_\s]*name|customer[-_\s]*name|client[-_\s]*name|user[-_\s]*name/i,
  
  // 艺术品/收藏品相关字段
  artist: /artist|creator|author|painter|sculptor|maker|designer|craftsman|artisan/i,
  maker: /maker|manufacturer|producer|studio|workshop|atelier|foundry|factory/i,
  yearOfProduction: /year[-_\s]*of[-_\s]*production|production[-_\s]*year|creation[-_\s]*year|year[-_\s]*created|date[-_\s]*created|made[-_\s]*in|manufactured[-_\s]*in|produced[-_\s]*in/i,
  dimensions: /dimensions|size|measurements|height[-_\s]*width|width[-_\s]*height|length[-_\s]*width|h[-_\s]*w[-_\s]*d|diameter|scale/i,
  middleName: /middle[-_\s]*name|mname|middle[-_\s]*initial/i,
  email: /email|e-mail|electronic[-_\s]*mail|mail[-_\s]*address|contact[-_\s]*email/i,
  phone: /phone|tel|telephone|mobile|cell|contact[-_\s]*number|phone[-_\s]*number|mobile[-_\s]*number/i,
  alternatePhone: /alternate[-_\s]*phone|secondary[-_\s]*phone|other[-_\s]*phone|evening[-_\s]*phone|daytime[-_\s]*phone/i,
  fax: /fax[-_\s]*number|facsimile/i,
  
  // 地址信息
  address: /address|street|addr|location|residence|mailing[-_\s]*address|shipping[-_\s]*address|billing[-_\s]*address/i,
  addressLine2: /address[-_\s]*line[-_\s]*2|address[-_\s]*2|apt|apartment|suite|unit|floor/i,
  city: /city|town|municipality|locality/i,
  state: /state|province|region|territory|district/i,
  country: /country|nation|land|nationality/i,
  zipCode: /zip|postal|postcode|zip[-_\s]*code|postal[-_\s]*code/i,
  
  // 身份和工作信息
  idNumber: /\b(id|number|member[-_\s]*id|insurance[-_\s]*id|identification)[-_\s]*(number|no|#)?\b/i,
  ssn: /ssn|social[-_\s]*security|social[-_\s]*security[-_\s]*number/i,
  driverLicense: /driver'?s?[-_\s]*license|driving[-_\s]*license|license[-_\s]*number/i,
  passport: /passport[-_\s]*number|passport[-_\s]*id|travel[-_\s]*document/i,
  insuranceProvider: /insurance[-_\s]*provider|insurance[-_\s]*company|carrier|insurer|insurance[-_\s]*plan/i,
  policyNumber: /policy[-_\s]*number|policy[-_\s]*id|insurance[-_\s]*policy/i,
  jobTitle: /job[-_\s]*title|position|role|occupation|title|profession|employment|job[-_\s]*role/i,
  company: /company|organization|employer|business[-_\s]*name|firm|corporation|enterprise|workplace/i,
  department: /department|dept|division|team|group|unit/i,
  employeeId: /employee[-_\s]*id|staff[-_\s]*id|worker[-_\s]*id|personnel[-_\s]*number/i,
  
  // 通信和反馈
  comments: /comments?|^message$|\smessage\s|message[-_\s]*box|feedback|note|description|additional[-_\s]*info|additional[-_\s]*details|tell[-_\s]*us|inquiry|question|request|your[-_\s]*message/i,
  
  // 个人特征
  age: /age|years|how[-_\s]*old|date[-_\s]*of[-_\s]*birth|dob|birth[-_\s]*date/i,
  gender: /gender|sex|male[-_\s]*female|m[-_\s]*f/i,
  income: /income|salary|annual[-_\s]*income|yearly[-_\s]*income|earnings/i,
  maritalStatus: /marital[-_\s]*status|relationship[-_\s]*status|single|married|divorced|widowed/i,
  nationality: /nationality|citizenship|citizen[-_\s]*of/i,
  
  // 教育和兴趣
  education: /education|degree|qualification|academic|school|college|university/i,
  major: /major|field[-_\s]*of[-_\s]*study|specialization|concentration/i,
  graduationYear: /graduation[-_\s]*year|year[-_\s]*of[-_\s]*graduation|class[-_\s]*of/i,
  gpa: /gpa|grade[-_\s]*point[-_\s]*average|academic[-_\s]*score/i,
  interests: /interests|hobbies|activities|preferences|likes/i,
  skills: /skills|abilities|competencies|expertise|proficiencies/i,
  languages: /languages|language[-_\s]*proficiency|spoken[-_\s]*languages/i,
  
  // 来源和引荐
  referral: /referral|how[-_\s]*did[-_\s]*you[-_\s]*hear|how[-_\s]*did[-_\s]*you[-_\s]*find|source/i,
  referralCode: /referral[-_\s]*code|reference[-_\s]*code|referrer[-_\s]*code/i,
  
  // 网络和社交媒体
  website: /website|site|url|web[-_\s]*address|homepage/i,
  socialMedia: /social[-_\s]*media|facebook|twitter|instagram|linkedin|social[-_\s]*profile/i,
  
  // 问答和订阅
  answer: /answer|response|reply|who|what|when|where|why|how/i,
  newsletter: /newsletter|subscribe|updates|notifications|mailing[-_\s]*list/i,
  
  // 账户和安全
  password: /password|pass|pwd|passcode/i,
  confirmPassword: /confirm[-_\s]*password|verify[-_\s]*password|retype[-_\s]*password|password[-_\s]*again/i,
  username: /username|user[-_\s]*id|login[-_\s]*name|login[-_\s]*id|account[-_\s]*name/i,
  securityQuestion: /security[-_\s]*question|secret[-_\s]*question|password[-_\s]*recovery/i,
  securityAnswer: /security[-_\s]*answer|secret[-_\s]*answer|answer[-_\s]*to[-_\s]*security/i,
  
  // 支付信息
  creditCard: /credit[-_\s]*card|card[-_\s]*number|payment[-_\s]*card|cc[-_\s]*number/i,
  expiryDate: /expiry|expiration|exp[-_\s]*date|valid[-_\s]*until|valid[-_\s]*thru/i,
  cvv: /cvv|cvc|security[-_\s]*code|card[-_\s]*verification/i,
  nameOnCard: /name[-_\s]*on[-_\s]*card|cardholder[-_\s]*name|card[-_\s]*holder/i,
  billingAddress: /billing[-_\s]*address|payment[-_\s]*address|bill[-_\s]*to[-_\s]*address/i,
  accountNumber: /account[-_\s]*number|bank[-_\s]*account|account[-_\s]*no/i,
  routingNumber: /routing[-_\s]*number|aba[-_\s]*number|bank[-_\s]*routing/i,
  
  // 商品和促销
  quantity: /quantity|qty|amount|number[-_\s]*of[-_\s]*items/i,
  coupon: /coupon|promo[-_\s]*code|discount[-_\s]*code|voucher/i,
  
  // 医疗相关
  medicalId: /medical[-_\s]*id|patient[-_\s]*id|health[-_\s]*id|medical[-_\s]*record[-_\s]*number|mrn/i,
  symptoms: /symptoms|medical[-_\s]*condition|health[-_\s]*issue|complaint|diagnosis/i,
  allergies: /allergies|allergy|allergic[-_\s]*to/i,
  medications: /medications|medicine|prescription|drugs|current[-_\s]*medication/i,
  bloodType: /blood[-_\s]*type|blood[-_\s]*group/i,
  height: /height|tall/i,
  weight: /weight|mass|pounds|kilograms/i,
  
  // 旅行相关
  flightNumber: /flight[-_\s]*number|flight[-_\s]*no|flight[-_\s]*#/i,
  bookingReference: /booking[-_\s]*reference|booking[-_\s]*number|reservation[-_\s]*number|confirmation[-_\s]*number|itinerary[-_\s]*number|pnr/i,
  departureDate: /departure[-_\s]*date|date[-_\s]*of[-_\s]*departure|leaving[-_\s]*date|outbound[-_\s]*date/i,
  returnDate: /return[-_\s]*date|date[-_\s]*of[-_\s]*return|arrival[-_\s]*date|inbound[-_\s]*date/i,
  travelClass: /travel[-_\s]*class|cabin[-_\s]*class|seat[-_\s]*class|economy|business|first[-_\s]*class/i,
  
  // 其他通用字段
  subject: /subject|topic|regarding|re:/i,
  date: /date(?![-_\s]*of[-_\s]*birth)|event[-_\s]*date|appointment[-_\s]*date/i,
  time: /time|hour|appointment[-_\s]*time|meeting[-_\s]*time|event[-_\s]*time/i,
  duration: /duration|length|period|how[-_\s]*long/i,
  url: /url|link|web[-_\s]*link/i,
  fileUpload: /upload|file|attach|document|photo|picture|image/i
};

// 移除字符串中的空格
function removeSpaces(str) {
  return str.replace(/\s+/g, '');
}

// 模拟用户输入，逐个字符输入并触发键盘事件
function simulateUserTyping(element, value) {
  // 先清空当前值
  element.value = '';
  element.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  
  // 如果值为空，直接返回
  if (!value) return;
  
  // 获取当前焦点
  const activeElement = document.activeElement;
  
  // 聚焦到目标元素
  element.focus();
  
  // 设置值并触发事件
  element.value = value;
  
  // 触发输入事件
  element.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  element.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
  
  // 添加随机延迟，模拟人类输入行为
  const randomDelay = Math.floor(Math.random() * 50) + 10;
  setTimeout(() => {
    // 触发额外的输入事件，确保某些复杂表单能正确识别
    element.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  }, randomDelay);
  
  // 恢复原来的焦点
  if (activeElement && activeElement !== element) {
    setTimeout(() => {
      try {
        activeElement.focus();
      } catch (e) {
        // 忽略焦点恢复错误
      }
    }, randomDelay + 10);
  }
}

// 生成数据
const DATA_GENERATOR = {
  firstName: () => {
    const names = ['John', 'Michael', 'David', 'James', 'Robert', 'William', 'Richard', 'Joseph', 'Thomas', 'Charles'];
    return removeSpaces(names[Math.floor(Math.random() * names.length)]);
  },
  lastName: () => {
    const names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    return removeSpaces(names[Math.floor(Math.random() * names.length)]);
  },
  name: () => {
    return removeSpaces(`${DATA_GENERATOR.firstName()}${DATA_GENERATOR.lastName()}`);
  },
  email: () => {
    // 使用随机英文名字作为用户名，从多个海外邮箱域名中随机选择
    const randomName = DATA_GENERATOR.firstName().toLowerCase() + 
                      (Math.random() > 0.5 ? DATA_GENERATOR.lastName().toLowerCase() : '') + 
                      (Math.random() > 0.7 ? Math.floor(Math.random() * 1000) : '');
    
    // 定义企业邮箱域名列表（优先使用）
    const businessEmailDomains = [
      'company.com',     // 通用企业域名
      'corp.com',        // 通用企业域名
      'business.com',    // 通用企业域名
      'enterprise.com',  // 通用企业域名
      'office.com',      // 通用企业域名
      'work.com',        // 通用企业域名
      'corporate.com',   // 通用企业域名
      'organization.com',// 通用企业域名
      'microsoft.com',   // 微软公司
      'apple.com',       // 苹果公司
      'amazon.com',      // 亚马逊公司
      'ibm.com',         // IBM公司
      'oracle.com',      // Oracle公司
      'intel.com',       // Intel公司
      'cisco.com',       // Cisco公司
      'dell.com',        // Dell公司
      'hp.com',          // 惠普公司
      'salesforce.com',  // Salesforce公司
      'adobe.com',       // Adobe公司
      'sap.com'          // SAP公司
    ];
    
    // 定义常用海外邮箱域名列表（作为备选）
    const personalEmailDomains = [
      'gmail.com',       // Google邮箱
      'outlook.com',     // 微软Outlook邮箱
      'hotmail.com',     // 微软Hotmail邮箱
      'yahoo.com',       // 雅虎邮箱
      'icloud.com',      // 苹果iCloud邮箱
      'protonmail.com',  // ProtonMail加密邮箱
      'mail.com',        // Mail.com邮箱
      'zoho.com',        // Zoho邮箱
      'aol.com',         // AOL邮箱
      'gmx.com',         // GMX邮箱
      'tutanota.com',    // Tutanota加密邮箱
      'fastmail.com',    // Fastmail邮箱
      'yandex.com',      // Yandex邮箱
      'live.com',        // 微软Live邮箱
      'me.com'           // 苹果Me邮箱
    ];
    
    // 优先使用企业邮箱域名（80%概率），因为表单可能要求使用企业邮箱
    const useBusinessEmail = Math.random() < 0.8;
    const domain = useBusinessEmail
      ? businessEmailDomains[Math.floor(Math.random() * businessEmailDomains.length)]
      : personalEmailDomains[Math.floor(Math.random() * personalEmailDomains.length)];
    
    return `${randomName}@${domain}`;
  },
  phone: () => {
    // 定义常用国际区号列表
    const countryCodes = [
      '+1',   // 美国/加拿大
      '+44',  // 英国
      '+86',  // 中国
      '+81',  // 日本
      '+82',  // 韩国
      '+91',  // 印度
      '+61',  // 澳大利亚
      '+49',  // 德国
      '+33',  // 法国
      '+7',   // 俄罗斯
      '+39',  // 意大利
      '+34',  // 西班牙
      '+55',  // 巴西
      '+52',  // 墨西哥
      '+65'   // 新加坡
    ];
    
    // 随机选择一个国际区号
    const countryCode = countryCodes[Math.floor(Math.random() * countryCodes.length)];
    
    // 生成10位随机数字的电话号码
    const phoneNumber = Array(10).fill(null).map(() => Math.floor(Math.random() * 10)).join('');
    
    // 返回不带空格的号码
    return `${countryCode}${phoneNumber}`; // 移除空格以符合某些表单验证要求
  },
  address: () => {
    const streets = ['MainSt', 'OakAve', 'MapleDr', 'CedarLn', 'PineSt', 'ElmRd', 'WashingtonBlvd', 'LakeDr'];
    return removeSpaces(`${Math.floor(Math.random() * 9000) + 1000}${streets[Math.floor(Math.random() * streets.length)]}`);
  },
  city: () => {
    const cities = ['LosAngeles', 'SanFrancisco', 'NewYork', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'SanAntonio', 'SanDiego', 'Dallas'];
    return removeSpaces(cities[Math.floor(Math.random() * cities.length)]);
  },
  state: (defaultState = 'CA') => defaultState,
  country: () => 'UnitedStates',
  zipCode: () => {
    // 使用常见的美国邮编前缀，确保生成有效的美国邮编
    // 这些是美国人口最多的几个城市的邮编前缀
    const commonZipPrefixes = [
      '10001', // Manhattan, New York, NY
      '90001', // Los Angeles, CA
      '60601', // Chicago, IL
      '77001', // Houston, TX
      '19101', // Philadelphia, PA
      '75201', // Dallas, TX
      '85001', // Phoenix, AZ
      '78201', // San Antonio, TX
      '92101', // San Diego, CA
      '94101', // San Francisco, CA
      '98101', // Seattle, WA
      '80201', // Denver, CO
      '20001', // Washington, DC
      '89101', // Las Vegas, NV
      '33101', // Miami, FL
    ];
    
    // 随机选择一个前缀
    const prefix = commonZipPrefixes[Math.floor(Math.random() * commonZipPrefixes.length)];
    // 生成剩余的数字，确保总长度为5位
    const remainingDigits = 5 - prefix.length;
    let suffix = '';
    for (let i = 0; i < remainingDigits; i++) {
      suffix += Math.floor(Math.random() * 10);
    }
    
    return prefix + suffix;
  },
  insuranceProvider: () => {
    const providers = [
      'BlueCrossBlueShield',
      'UnitedHealthcare',
      'Aetna',
      'Cigna',
      'Humana',
      'Kaiser',
      'Anthem',
      'MetLife',
      'Wellcare',
      'Molina'
    ];
    return removeSpaces(providers[Math.floor(Math.random() * providers.length)]);
  },
  jobTitle: () => {
    const titles = [
      'SoftwareEngineer',
      'ProjectManager',
      'BusinessAnalyst',
      'MarketingManager',
      'ProductManager',
      'SalesRepresentative',
      'DataScientist',
      'SystemAdministrator',
      'FinancialAnalyst',
      'HumanResources'
    ];
    return removeSpaces(titles[Math.floor(Math.random() * titles.length)]);
  },
  company: () => {
    const companies = [
      'TechSolutionsInc',
      'GlobalInnovations',
      'DigitalSystems',
      'AdvancedCorp',
      'PrimeIndustries',
      'NextGenTech',
      'FutureWorks',
      'InnovateNow',
      'SmartSolutions',
      'EliteCorp'
    ];
    return removeSpaces(companies[Math.floor(Math.random() * companies.length)]);
  },
  comments: () => {
    const comments = [
      'InterestedInLearningMoreAboutTheOpportunities',
      'LookingForwardToDiscussingThisFurther',
      'PleaseContactMeRegardingThisPosition',
      'ExcitedAboutThisOpportunity',
      'IWouldLikeToKnowMoreDetails',
      'PleaseProvideAdditionalInformation',
      'IAmAvailableForAnInterview',
      'ThankYouForConsideringMyApplication'
    ];
    return removeSpaces(comments[Math.floor(Math.random() * comments.length)]);
  },
  age: () => {
    const today = new Date();
    const year = today.getFullYear() - Math.floor(Math.random() * 50) - 18; // 18-68岁
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1; // 使用28天避免月份问题
    return `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${year}`;
  },
  gender: () => {
    const genders = ['Male', 'Female', 'Other'];
    return removeSpaces(genders[Math.floor(Math.random() * genders.length)]);
  },
  income: () => {
    const incomes = ['Under25000', '25000-50000', '50000-75000', '75000-100000', 'Over100000'];
    return removeSpaces(incomes[Math.floor(Math.random() * incomes.length)]);
  },
  education: () => {
    const educations = ['HighSchool', 'Associate', 'Bachelor', 'Master', 'Doctorate'];
    return removeSpaces(educations[Math.floor(Math.random() * educations.length)]);
  },
  interests: () => {
    const interests = ['Technology', 'Sports', 'Music', 'Travel', 'Reading', 'Cooking', 'Photography', 'Gaming'];
    return removeSpaces(interests[Math.floor(Math.random() * interests.length)]);
  },
  referral: () => {
    const referrals = ['SearchEngine', 'SocialMedia', 'Friend', 'Advertisement', 'EmailCampaign'];
    return removeSpaces(referrals[Math.floor(Math.random() * referrals.length)]);
  },
  website: () => {
    const sites = ['www.mywebsite.com', 'www.portfolio.net', 'www.professional.org', 'www.personal.io'];
    return removeSpaces(sites[Math.floor(Math.random() * sites.length)]);
  },
  socialMedia: () => {
    const profiles = ['facebook.com/user', 'twitter.com/user', 'linkedin.com/in/user', 'instagram.com/user'];
    return removeSpaces(profiles[Math.floor(Math.random() * profiles.length)]);
  },
  newsletter: () => {
    return 'Yes';
  },
  password: () => {
    return 'SecurePassword123!';
  },
  confirmPassword: () => {
    return 'SecurePassword123!';
  },
  username: () => {
    return `user${Math.floor(Math.random() * 10000)}`;
  },
  creditCard: () => {
    return `4${Math.floor(Math.random() * 1000000000000000)}`;
  },
  expiryDate: () => {
    const month = Math.floor(Math.random() * 12) + 1;
    const year = new Date().getFullYear() + Math.floor(Math.random() * 5) + 1;
    return `${month < 10 ? '0' + month : month}/${year}`;
  },
  idNumber: () => {
    const length = Math.floor(Math.random() * 4) + 1; // 生成1-5位长度的随机数
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  },
  cvv: () => {
    return `${Math.floor(Math.random() * 900) + 100}`;
  },
  quantity: () => {
    return `${Math.floor(Math.random() * 10) + 1}`;
  },
  coupon: () => {
    return `DISCOUNT${Math.floor(Math.random() * 1000)}`;
  },
  subject: () => {
    const subjects = ['Inquiry', 'Feedback', 'Support', 'Information', 'Request'];
    return removeSpaces(subjects[Math.floor(Math.random() * subjects.length)]);
  },
  terms: () => {
    // 对于条款复选框，返回true表示勾选
    return true;
  },
  answer: () => {
    // 根据常见问题提供答案
    const answers = {
      'who referred you to centropix': 'Friend',
      'how did you hear about us': 'SocialMedia',
      'how did you find us': 'GoogleSearch',
      'who introduced you': 'BusinessPartner',
      'what is your favorite product': 'YourMainProduct',
      'why are you interested': 'QualityAndReputation',
      'where did you learn about us': 'OnlineReview',
      'when did you first hear about us': 'LastMonth'
    };
    
    // 默认答案
    return 'Friend';
  },
  
  // 新增字段的数据生成器
  middleName: () => {
    const names = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'];
    return names[Math.floor(Math.random() * names.length)];
  },
  
  alternatePhone: () => {
    // 使用与phone相同的生成逻辑，但确保生成不同的号码
    return DATA_GENERATOR.phone();
  },
  
  fax: () => {
    // 生成美国格式的传真号码
    return '+1 ' + Array(10).fill(null).map(() => Math.floor(Math.random() * 10)).join('');
  },
  
  addressLine2: () => {
    const types = ['Apt', 'Suite', 'Unit', 'Floor'];
    const type = types[Math.floor(Math.random() * types.length)];
    return `${type} ${Math.floor(Math.random() * 999) + 1}`;
  },
  
  ssn: () => {
    // 生成美国社会安全号码格式 (XXX-XX-XXXX)
    const part1 = Math.floor(Math.random() * 900) + 100;
    const part2 = Math.floor(Math.random() * 90) + 10;
    const part3 = Math.floor(Math.random() * 9000) + 1000;
    return `${part1}-${part2}-${part3}`;
  },
  
  driverLicense: () => {
    // 生成驾照号码 (字母+数字组合)
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 2; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 6; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  },
  
  passport: () => {
    // 生成美国护照号码格式 (9位数字)
    let result = '';
    for (let i = 0; i < 9; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  },
  
  policyNumber: () => {
    // 生成保险单号
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 2; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 8; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  },
  
  department: () => {
    const departments = ['Engineering', 'Marketing', 'Sales', 'Finance', 'HR', 'Operations', 'IT', 'CustomerSupport', 'Research', 'Legal'];
    return removeSpaces(departments[Math.floor(Math.random() * departments.length)]);
  },
  
  employeeId: () => {
    // 生成员工ID (EMP + 数字)
    return `EMP${Math.floor(Math.random() * 90000) + 10000}`;
  },
  
  maritalStatus: () => {
    const statuses = ['Single', 'Married', 'Divorced', 'Widowed', 'Separated', 'InRelationship'];
    return removeSpaces(statuses[Math.floor(Math.random() * statuses.length)]);
  },
  
  nationality: () => {
    const nationalities = ['American', 'British', 'Canadian', 'Australian', 'German', 'French', 'Japanese', 'Chinese', 'Indian', 'Brazilian'];
    return removeSpaces(nationalities[Math.floor(Math.random() * nationalities.length)]);
  },
  
  major: () => {
    const majors = ['ComputerScience', 'Business', 'Engineering', 'Medicine', 'Law', 'Psychology', 'Economics', 'Mathematics', 'Physics', 'Literature'];
    return removeSpaces(majors[Math.floor(Math.random() * majors.length)]);
  },
  
  graduationYear: () => {
    // 生成过去20年内的毕业年份
    const currentYear = new Date().getFullYear();
    return `${currentYear - Math.floor(Math.random() * 20)}`;
  },
  
  gpa: () => {
    // 生成GPA (0.0-4.0)
    return (Math.random() * 3 + 1).toFixed(2);
  },
  
  skills: () => {
    const skillsList = ['Programming', 'ProjectManagement', 'DataAnalysis', 'Communication', 'Leadership', 'ProblemSolving', 'Teamwork', 'Creativity'];
    return removeSpaces(skillsList[Math.floor(Math.random() * skillsList.length)]);
  },
  
  languages: () => {
    const languagesList = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Russian', 'Arabic'];
    return removeSpaces(languagesList[Math.floor(Math.random() * languagesList.length)]);
  },
  
  referralCode: () => {
    // 生成推荐码
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = 'REF';
    for (let i = 0; i < 5; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  },
  
  securityQuestion: () => {
    const questions = [
      'WhatWasYourFirstPetsName',
      'WhatWasTheNameOfYourFirstSchool',
      'WhatIsYourMothersMiddleName',
      'WhatWasYourChildhoodNickname',
      'WhatIsTheNameOfTheStreetYouGrewUpOn'
    ];
    return removeSpaces(questions[Math.floor(Math.random() * questions.length)]);
  },
  
  securityAnswer: () => {
    const answers = ['Spot', 'Lincoln', 'Marie', 'Junior', 'MapleStreet'];
    return removeSpaces(answers[Math.floor(Math.random() * answers.length)]);
  },
  
  nameOnCard: () => {
    // 使用姓名生成器
    return `${DATA_GENERATOR.firstName()} ${DATA_GENERATOR.lastName()}`;
  },
  
  billingAddress: () => {
    // 使用地址生成器
    return DATA_GENERATOR.address();
  },
  
  accountNumber: () => {
    // 生成银行账号
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  },
  
  routingNumber: () => {
    // 生成9位数的美国银行路由号码
    let result = '';
    for (let i = 0; i < 9; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  },
  
  medicalId: () => {
    // 生成医疗ID
    return `MED${Math.floor(Math.random() * 900000) + 100000}`;
  },
  
  symptoms: () => {
    const symptomsList = ['Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea', 'SoreThroat', 'BodyAche', 'Dizziness'];
    return removeSpaces(symptomsList[Math.floor(Math.random() * symptomsList.length)]);
  },
  
  allergies: () => {
    const allergiesList = ['None', 'Peanuts', 'Shellfish', 'Dairy', 'Pollen', 'Penicillin', 'Latex', 'Eggs'];
    return removeSpaces(allergiesList[Math.floor(Math.random() * allergiesList.length)]);
  },
  
  medications: () => {
    const medicationsList = ['None', 'Aspirin', 'Ibuprofen', 'Antibiotics', 'Antihistamine', 'VitaminSupplements', 'BloodPressureMedication'];
    return removeSpaces(medicationsList[Math.floor(Math.random() * medicationsList.length)]);
  },
  
  bloodType: () => {
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    return bloodTypes[Math.floor(Math.random() * bloodTypes.length)];
  },
  
  height: () => {
    // 生成身高 (5'2" - 6'4")
    const feet = Math.floor(Math.random() * 2) + 5;
    const inches = Math.floor(Math.random() * 12);
    return `${feet}'${inches}"`;
  },
  
  weight: () => {
    // 生成体重 (120-220 lbs)
    return `${Math.floor(Math.random() * 100) + 120} lbs`;
  },
  
  flightNumber: () => {
    // 生成航班号
    const airlines = ['AA', 'UA', 'DL', 'BA', 'LH', 'AF', 'CX', 'SQ', 'EK'];
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const number = Math.floor(Math.random() * 9000) + 1000;
    return `${airline}${number}`;
  },
  
  bookingReference: () => {
    // 生成预订参考号 (6位字母数字组合)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },
  
  departureDate: () => {
    // 生成未来30-180天内的出发日期
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + Math.floor(Math.random() * 150) + 30);
    const month = futureDate.getMonth() + 1;
    const day = futureDate.getDate();
    const year = futureDate.getFullYear();
    return `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${year}`;
  },
  
  returnDate: () => {
    // 生成比出发日期晚7-21天的返回日期
    const today = new Date();
    const departureOffset = Math.floor(Math.random() * 150) + 30;
    const returnOffset = departureOffset + Math.floor(Math.random() * 14) + 7;
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + returnOffset);
    const month = futureDate.getMonth() + 1;
    const day = futureDate.getDate();
    const year = futureDate.getFullYear();
    return `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${year}`;
  },
  
  travelClass: () => {
    const classes = ['Economy', 'PremiumEconomy', 'Business', 'First'];
    return removeSpaces(classes[Math.floor(Math.random() * classes.length)]);
  },
  
  date: () => {
    // 生成未来30天内的日期
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + Math.floor(Math.random() * 30) + 1);
    const month = futureDate.getMonth() + 1;
    const day = futureDate.getDate();
    const year = futureDate.getFullYear();
    return `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${year}`;
  },
  
  time: () => {
    // 生成时间 (HH:MM AM/PM)
    const hour = Math.floor(Math.random() * 12) + 1;
    const minute = Math.floor(Math.random() * 60);
    const ampm = Math.random() > 0.5 ? 'AM' : 'PM';
    return `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute} ${ampm}`;
  },
  
  duration: () => {
    // 生成持续时间 (1-4小时)
    const hours = Math.floor(Math.random() * 4) + 1;
    const minutes = Math.floor(Math.random() * 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`;
  },
  
  url: () => {
    // 生成URL
    const domains = ['example.com', 'mysite.org', 'testsite.net', 'demo.io', 'sample.co'];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `https://www.${domain}`;
  },
  
  fileUpload: () => {
    // 对于文件上传字段，返回一个占位符文本
    return 'test_file.pdf';
  },
  
  // 艺术品/收藏品相关字段的数据生成器
  artist: () => {
    const artists = ['PabloPicasso', 'VincentVanGogh', 'ClaudeMonet', 'LeonardoDaVinci', 'MichelangeloBuonarroti', 'SalvadorDali', 'FridaKahlo', 'AndyWarhol', 'GeorgiaOKeeffe', 'JacksonPollock'];
    return removeSpaces(artists[Math.floor(Math.random() * artists.length)]);
  },
  
  maker: () => {
    const makers = ['TiffanyStudios', 'RoyalDoulton', 'Wedgwood', 'Steuben', 'Lalique', 'Baccarat', 'Meissen', 'RoyalCopenhagen', 'Limoges', 'Waterford'];
    return removeSpaces(makers[Math.floor(Math.random() * makers.length)]);
  },
  
  yearOfProduction: () => {
    // 生成1800年至今的年份
    const currentYear = new Date().getFullYear();
    return `${Math.floor(Math.random() * (currentYear - 1800 + 1)) + 1800}`;
  },
  
  dimensions: () => {
    // 生成常见的艺术品尺寸格式
    const height = Math.floor(Math.random() * 200) + 10; // 10-210 cm
    const width = Math.floor(Math.random() * 200) + 10;  // 10-210 cm
    const depth = Math.floor(Math.random() * 50) + 1;    // 1-51 cm (可选)
    
    // 50%概率返回二维尺寸，50%概率返回三维尺寸
    if (Math.random() > 0.5) {
      return `${height}x${width}cm`;
    } else {
      return `${height}x${width}x${depth}cm`;
    }
  }
};

// 记录已填写的表单元素
// 使用let而不是const，因为在URL变化时需要重新赋值
let filledElements = new WeakSet();

// 记录上次填写时间
let lastFillTime = 0;
const FILL_INTERVAL = 2000; // 最小填写间隔(ms)

// 获取元素周围的文本内容
function getSurroundingText(element, maxDepth = 2) {
  const texts = [];
  
  // 优先获取元素的label文本
  if (element.labels && element.labels.length > 0) {
    Array.from(element.labels).forEach(label => {
      // 只获取label中的直接文本内容
      // 递归获取所有文本内容
      function getAllText(element) {
        let text = '';
        if (element.nodeType === Node.TEXT_NODE) {
          text += element.textContent.trim();
        } else if (element.nodeType === Node.ELEMENT_NODE) {
          for (const child of element.childNodes) {
            text += getAllText(child);
          }
        }
        return text;
      }
      const labelText = getAllText(label);
      if (labelText) {
        texts.push(labelText);
      }
    });
  }
  
  // 通过for属性关联的label
  if (element.id) {
    const labelsForElement = document.querySelectorAll(`label[for="${element.id}"]`);
    if (labelsForElement.length > 0) {
      Array.from(labelsForElement).forEach(label => {
        // 只获取label中的直接文本内容
        // 递归获取所有文本内容
        function getAllText(element) {
          let text = '';
          if (element.nodeType === Node.TEXT_NODE) {
            text += element.textContent.trim();
          } else if (element.nodeType === Node.ELEMENT_NODE) {
            for (const child of element.childNodes) {
              text += getAllText(child);
            }
          }
          return text;
        }
        const labelText = getAllText(label);
        if (labelText) {
          texts.push(labelText);
        }
      });
    }
  }
  
  // 获取父元素中的标题文本
  let currentElement = element;
  let depth = 0;
  
  while (currentElement && depth < maxDepth) {
    // 查找最近的标题元素，包括title类名
    const headings = currentElement.querySelectorAll('h1, h2, h3, h4, h5, h6, legend, .form-label, .field-label, .label, .title');
    headings.forEach(heading => {
      function getAllText(element) {
        let text = '';
        if (element.nodeType === Node.TEXT_NODE) {
          text += element.textContent.trim();
        } else if (element.nodeType === Node.ELEMENT_NODE) {
          for (const child of element.childNodes) {
            text += getAllText(child);
          }
        }
        return text;
      }
      const headingText = getAllText(heading);
      if (headingText) {
        texts.push(headingText);
      }
    });
    
    // 向上查找父元素
    currentElement = currentElement.parentElement;
    depth++;
  }
  
  return texts.join(' ');
}

// 识别表单字段
function identifyField(element) {
  // 添加调试日志
  console.log(`识别字段: ${element.tagName} id=${element.id}, name=${element.name}, placeholder=${element.placeholder}, type=${element.type}`);

  // 2. 获取标签标题文本（优先级最高）
  const labelTexts = [];
  
  // 递归获取所有文本内容的函数
  function getAllText(element) {
    let text = '';
    if (element.nodeType === Node.TEXT_NODE) {
      text += element.textContent.trim();
    } else if (element.nodeType === Node.ELEMENT_NODE) {
      for (const child of element.childNodes) {
        text += getAllText(child);
      }
    }
    return text;
  }

  // 获取直接关联的label文本
  if (element.labels && element.labels.length > 0) {
    Array.from(element.labels).forEach(label => {
      const labelText = getAllText(label);
      if (labelText) {
        labelTexts.push(labelText);
      }
    });
  }
  
  // 获取通过for属性关联的label文本
  if (element.id) {
    const labelsForElement = document.querySelectorAll(`label[for="${element.id}"]`);
    if (labelsForElement.length > 0) {
      Array.from(labelsForElement).forEach(label => {
        const labelText = getAllText(label);
        if (labelText) {
          labelTexts.push(labelText);
        }
      });
    }
  }

  // 3. 收集元素的基本属性（第二优先级）
  const elementAttributes = [
    element.id,
    element.name,
    element.placeholder,
    element.getAttribute('aria-label')
  ].filter(Boolean);

  // 4. 获取周围的文本内容（最后考虑）
  const surroundingText = getSurroundingText(element);

  // 分别测试每层文本
  const labelText = labelTexts.join(' ').toLowerCase();
  const basicAttrs = elementAttributes.join(' ').toLowerCase();
  const allText = [labelText, basicAttrs, surroundingText].join(' ').toLowerCase();

  console.log('标签文本:', labelText);
  console.log('基本属性:', basicAttrs);
  console.log('所有文本:', allText);

  // 特殊处理：如果标签文本明确包含message，直接识别为comments字段
  if (/\bmessage\b/i.test(labelText)) {
    console.log('通过标签文本直接识别为message字段');
    return 'comments'; // message对应comments字段类型
  }

  // 先检查标签文本是否匹配
  for (const [fieldType, pattern] of Object.entries(FIELD_PATTERNS)) {
    if (pattern.test(labelText)) {
      console.log(`通过标签文本匹配成功: ${fieldType}`);
      return fieldType;
    }
  }

  // 再检查基本属性是否匹配
  for (const [fieldType, pattern] of Object.entries(FIELD_PATTERNS)) {
    if (pattern.test(basicAttrs)) {
      console.log(`通过基本属性匹配成功: ${fieldType}`);
      return fieldType;
    }
  }

  // 最后检查所有文本内容是否匹配
  for (const [fieldType, pattern] of Object.entries(FIELD_PATTERNS)) {
    if (pattern.test(allText)) {
      console.log(`通过所有文本匹配成功: ${fieldType}`);
      return fieldType;
    }
  }

  // 最后才检查元素本身的type属性（优先级最低）
  if (element.tagName.toLowerCase() === 'input') {
    if (element.type === 'email') {
      console.log('通过input type="email"直接识别为email字段');
      return 'email';
    }
    if (element.type === 'tel') {
      console.log('通过input type="tel"直接识别为phone字段');
      return 'phone';
    }
    // 只有当ID、名称或标签中包含birth、dob或age相关文本时，才识别为age字段
    if ((element.type === 'date' || 
        (element.type === 'text' && element.placeholder && /mm\/dd\/yyyy/i.test(element.placeholder)))) {
      if (/\b(birth|dob|age|birthday|birthdate)\b/i.test(labelText) || /\b(birth|dob|age|birthday|birthdate)\b/i.test(element.id || element.name || '')) {
        console.log('通过input type="date"和相关标签识别为age字段');
        return 'age';
      }
    }
    // 特殊处理：通过placeholder识别电话号码
    if (element.placeholder && /^\d{3}[-.s]?\d{3}[-.s]?\d{4}$|^\(\d{3}\)\s?\d{3}[-.s]?\d{4}$/i.test(element.placeholder)) {
      console.log('通过电话号码格式的placeholder识别为phone字段');
      return 'phone';
    }
  }

  console.log('未匹配到任何字段类型');
  return null;
}

// 处理select元素，随机选择一个选项
function handleSelectElement(select) {
  // 获取所有非空选项
  const options = Array.from(select.options).filter(option => 
    option.value && !option.disabled && option.value !== 'null' && option.value !== 'undefined' && option.value !== '0'
  );
  
  // 如果没有有效选项，返回false
  if (options.length === 0) return false;
  
  // 随机选择一个选项
  const randomIndex = Math.floor(Math.random() * options.length);
  select.selectedIndex = Array.from(select.options).indexOf(options[randomIndex]);
  
  // 触发change和input事件，确保表单验证和依赖字段能够正确响应
  // 使用更安全的事件触发方式，防止影响页面布局
  select.dispatchEvent(new Event('change', { bubbles: true, cancelable: true, composed: false }));
  select.dispatchEvent(new Event('input', { bubbles: true, cancelable: true, composed: false }));
  
  return true;
}

// 显示填写成功提示
function showSuccessTooltip(element, fieldType) {
  // 获取元素位置
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  
  // 创建提示元素
  const tooltip = document.createElement('div');
  tooltip.className = 'form-fill-tooltip';
  
  // 创建图标元素
  const iconElement = document.createElement('span');
  iconElement.className = 'form-fill-tooltip-icon';
  
  // 使用扩展图标
  const iconUrl = chrome.runtime.getURL('icons/icon16.png');
  iconElement.style.backgroundImage = `url(${iconUrl})`;
  
  // 创建文本元素
  const textElement = document.createElement('span');
  const fieldName = fieldType.charAt(0).toUpperCase() + fieldType.slice(1);
  textElement.textContent = `${fieldName}识别成功`;
  
  // 组装提示元素
  tooltip.appendChild(iconElement);
  tooltip.appendChild(textElement);
  
  // 设置位置 - 在元素左上方
  tooltip.style.top = `${rect.top + scrollTop - 30}px`;
  tooltip.style.left = `${rect.left + scrollLeft}px`;
  tooltip.style.transform = 'translateY(0)';
  
  // 添加到页面
  document.body.appendChild(tooltip);
  
  // 显示动画
  setTimeout(() => {
    tooltip.classList.add('show');
  }, 10);
  
  // 自动移除
  setTimeout(() => {
    tooltip.classList.remove('show');
    setTimeout(() => {
      if (tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
      }
    }, 300);
  }, 2000);
}

// 检查元素是否可见
function isElementVisible(element) {
  if (!element) return false;
  
  try {
    const style = window.getComputedStyle(element);
    if (style.display === 'none' || 
        style.visibility === 'hidden' || 
        style.opacity === '0' || 
        style.width === '0px' || 
        style.height === '0px' ||
        style.pointerEvents === 'none' ||
        parseInt(style.opacity, 10) === 0) {
      return false;
    }
    
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      return false;
    }
    
    // 检查元素是否被其他元素覆盖
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    
    // 优化：使用elementFromPoint前先检查元素是否在视口内
    if (center.x < 0 || center.x > window.innerWidth || 
        center.y < 0 || center.y > window.innerHeight) {
      // 元素在视口外，但仍然可能是可见的
      return true;
    }
    
    const elementAtPoint = document.elementFromPoint(center.x, center.y);
    if (elementAtPoint && (element === elementAtPoint || element.contains(elementAtPoint) || elementAtPoint.contains(element))) {
      return true;
    }
    
    // 检查父元素可见性
    let parent = element.parentElement;
    let hasVisibleParent = false;
    
    while (parent && parent !== document.body) {
      const parentStyle = window.getComputedStyle(parent);
      if (parentStyle.display === 'none' || 
          parentStyle.visibility === 'hidden' || 
          parentStyle.opacity === '0' ||
          parseInt(parentStyle.opacity, 10) === 0) {
        return false;
      }
      if (parentStyle.overflow === 'hidden' || parentStyle.overflow === 'auto' || parentStyle.overflow === 'scroll') {
        hasVisibleParent = true;
      }
      parent = parent.parentElement;
    }
    
    // 如果找到了带有overflow的父元素，说明元素可能在滚动容器内
    if (hasVisibleParent) {
      return true;
    }
    
    return true;
  } catch (error) {
    console.log('检查元素可见性时出错:', error);
    // 出错时保守返回true，让其他机制来处理
    return true;
  }
}

// 自动聚焦到第一个可见的表单字段
function autoFocusToFirstField() {
  // 定义字段优先级
  const fieldPriorities = [
    // 最高优先级：个人基本信息
    'input[name*="first"], input[name*="fname"], input[id*="first"], input[id*="fname"]',
    'input[name*="last"], input[name*="lname"], input[id*="last"], input[id*="lname"]',
    'input[type="email"], input[name*="email"], input[id*="email"]',
    'input[type="tel"], input[name*="phone"], input[id*="phone"]',
    // 次高优先级：地址信息
    'input[name*="address"], input[id*="address"]',
    'input[name*="city"], input[id*="city"]',
    'input[name*="state"], input[id*="state"]',
    'input[name*="zip"], input[id*="zip"]',
    // 一般优先级：其他常见字段
    'textarea',
    'input[type="text"]',
    'input[type="number"]'
  ];

  // 按优先级依次查找可见的输入框
  for (const selector of fieldPriorities) {
    const inputs = document.querySelectorAll(selector);
    for (const input of inputs) {
      if (isElementVisible(input) && !input.disabled && !input.readOnly) {
        try {
          // 尝试常规聚焦
          input.focus();
          
          // 如果常规聚焦失败，尝试使用setTimeout
          setTimeout(() => {
            try {
              input.focus();
              console.log('自动聚焦到表单字段:', input);
            } catch (error) {
              console.log('延迟聚焦失败:', error);
            }
          }, 100);
          
          return true;
        } catch (error) {
          console.log('聚焦失败:', error);
          continue;
        }
      }
    }
  }
  
  return false;
}

// 处理国际电话代码下拉选择框
function handlePhoneCountryCodeDropdown() {
  // 查找所有国际电话代码下拉选择框
  const countryCodeDropdowns = document.querySelectorAll('.iti__selected-flag');
  
  countryCodeDropdowns.forEach(dropdown => {
    // 检查是否已处理过
    if (filledElements.has(dropdown)) return;
    
    // 标记为已处理
    filledElements.add(dropdown);
    
    // 创建一个MutationObserver来监听下拉菜单的出现
    const observer = new MutationObserver((mutations, obs) => {
      const countryList = document.querySelector('.iti__country-list');
      if (countryList) {
        // 找到下拉菜单后，选择第一个选项
        const firstCountry = countryList.querySelector('.iti__country');
        if (firstCountry) {
          firstCountry.click();
          console.log('已选择国际电话代码:', firstCountry.getAttribute('data-country-code'));
        }
        // 完成后断开观察器
        obs.disconnect();
      }
    });
    
    // 开始观察document.body的子节点变化
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // 模拟点击打开下拉菜单
    dropdown.click();
    
    // 设置一个安全超时，确保观察器不会无限期运行
    setTimeout(() => {
      observer.disconnect();
    }, 2000);
  });
}

// 处理单选按钮元素
function handleRadioElement(radio) {
  // 如果单选按钮已经被选中，不需要再处理
  if (radio.checked) return false;
  
  // 收集单选按钮的相关属性和标签文本
  const radioAttributes = [
    radio.id,
    radio.name,
    radio.className,
    radio.value
  ].filter(Boolean);
  
  // 获取关联的label文本
  let labelTexts = [];
  
  // 通过for属性关联的label
  if (radio.id) {
    const labelsForRadio = document.querySelectorAll(`label[for="${radio.id}"]`);
    if (labelsForRadio.length > 0) {
      Array.from(labelsForRadio).forEach(label => {
        labelTexts.push(label.textContent.trim());
      });
    }
  }
  
  // 直接关联的label
  if (radio.labels && radio.labels.length > 0) {
    Array.from(radio.labels).forEach(label => {
      labelTexts.push(label.textContent.trim());
    });
  }
  
  // 合并所有文本信息
  const attributes = [...radioAttributes, ...labelTexts].join(' ').toLowerCase();
  console.log(`处理单选按钮: id=${radio.id}, name=${radio.name}, value=${radio.value}, 属性集合="${attributes}"`);
  
  // 选择第一个单选按钮或者根据特定条件选择
  // 这里可以根据实际需求调整选择逻辑
  radio.checked = true;
  // 使用安全的事件配置防止影响页面布局
  radio.dispatchEvent(new Event('change', { bubbles: true, cancelable: true, composed: false }));
  radio.dispatchEvent(new Event('input', { bubbles: true, cancelable: true, composed: false }));
  console.log('已选择单选按钮:', radio, '标签文本:', labelTexts.join(', '));
  return true;
}

// 处理复选框元素
function handleCheckboxElement(checkbox) {
  // 检查是否是条款相关的复选框
  const attributes = [
    checkbox.id,
    checkbox.name,
    checkbox.className,
    ...Array.from(checkbox.labels || []).map(label => label.textContent)
  ].filter(Boolean).join(' ').toLowerCase();
  
  // 将复杂的正则表达式拆分为多个简单的正则表达式，提高性能
  const isTermsRelated = /terms|condition|agree|accept|consent/i.test(attributes);
  const isPrivacyRelated = /policy|privacy/i.test(attributes);
  const isMarketingRelated = /marketing|communications|receive|updates|optin|subscribe/i.test(attributes);
  const isRequired = checkbox.hasAttribute('required') || checkbox.required === true;
  
  // 如果是条款、隐私、营销相关或者必选的复选框，勾选它
  if (isTermsRelated || isPrivacyRelated || isMarketingRelated || isRequired) {
    checkbox.checked = true;
    // 使用安全的事件配置防止影响页面布局
    checkbox.dispatchEvent(new Event('change', { bubbles: true, cancelable: true, composed: false }));
    checkbox.dispatchEvent(new Event('input', { bubbles: true, cancelable: true, composed: false }));
    console.log('已勾选条款复选框:', checkbox);
    return true;
  }
  
  return false;
}

// 将fillForm和clearForm添加到window对象
window.fillForm = function(state = 'CA') {
  // 屏蔽 Facebook 移动网站
  if (window.location.hostname === 'm.facebook.com') {
    console.log('Facebook移动网站已被屏蔽');
    return;
  }
  
  // 检测页面刷新循环
  const refreshKey = 'formFillProRefreshDetection';
  const refreshCount = parseInt(sessionStorage.getItem(refreshKey) || '0');
  
  // 如果检测到连续刷新超过阈值，暂停自动填写
  if (refreshCount > 3) {
    console.log('检测到页面连续刷新，暂停自动填写以避免无限循环');
    // 5分钟后重置计数器
    setTimeout(() => {
      sessionStorage.setItem(refreshKey, '0');
    }, 5 * 60 * 1000);
    return;
  }
  
  // 更新刷新计数
  sessionStorage.setItem(refreshKey, (refreshCount + 1).toString());
  
  // 设置延迟，给页面充分时间加载
  const pageLoadDelay = refreshCount > 0 ? 2000 + (refreshCount * 1000) : 0;
  
  if (pageLoadDelay > 0) {
    console.log(`检测到页面刷新，延迟 ${pageLoadDelay}ms 后填写表单`);
    setTimeout(() => {
      performFillForm(state);
    }, pageLoadDelay);
    return;
  }
  
  // 直接执行填写
  performFillForm(state);
}

// 实际执行表单填写的函数
function performFillForm(state = 'CA') {
  // 检查填写间隔
  const now = Date.now();
  if (now - lastFillTime < FILL_INTERVAL) {
    return;
  }
  lastFillTime = now;

  // 先收集所有需要填充的字段，然后一次性填充
  const fieldsToFill = [];
  const inputs = document.querySelectorAll('input, select, textarea');
  let firstVisibleInput = null;
  
  // 处理国际电话代码下拉选择框
  handlePhoneCountryCodeDropdown();
  
  // 第一步：收集需要填充的字段
  inputs.forEach(input => {
    // 跳过已填写的元素
    if (filledElements.has(input)) return;
    // 跳过密码字段
    if (input.type === 'password') return;
    // 跳过隐藏字段
    if (input.type === 'hidden') return;
    // 跳过提交按钮
    if (input.type === 'submit') return;
    
    // 特殊处理单选按钮
    if (input.type === 'radio') {
      if (handleRadioElement(input)) {
        fieldsToFill.push({
          element: input,
          type: 'radio'
        });
      }
      return;
    }
    
    // 特殊处理复选框
    if (input.type === 'checkbox') {
      if (handleCheckboxElement(input)) {
        fieldsToFill.push({
          element: input,
          type: 'terms'
        });
      }
      return;
    }

    // 不在这里记录第一个可见输入框，改为从fieldsToFill中获取


    // 特殊处理select元素
    if (input.tagName.toLowerCase() === 'select') {
      if (handleSelectElement(input)) {
        fieldsToFill.push({
          element: input,
          type: 'select'
        });
      }
      return;
    }

    const fieldType = identifyField(input);
    if (!fieldType) return;

    const value = fieldType === 'state' ? 
      DATA_GENERATOR[fieldType](state) : 
      DATA_GENERATOR[fieldType]();
    
    fieldsToFill.push({
      element: input,
      type: fieldType,
      value: value
    });
  });
  
  // 设置第一个可见的输入框为fieldsToFill中的第一个非select类型元素
  for (const field of fieldsToFill) {
    if (field.type !== 'select' && field.type !== 'radio' && field.type !== 'terms' && 
        isElementVisible(field.element) && 
        (field.element.tagName.toLowerCase() === 'input' || field.element.tagName.toLowerCase() === 'textarea') &&
        !field.element.disabled && !field.element.readOnly) {
      firstVisibleInput = field.element;
      console.log('从fieldsToFill中设置第一个可见输入框:', firstVisibleInput);
      break;
    }
  }
  
  // 第二步：填充所有字段
  fieldsToFill.forEach(field => {
    const { element, type, value } = field;
    if (type === 'select') {
      // handleSelectElement已经触发了事件，这里不需要重复触发
      // 但为了保险起见，确保事件被触发，使用安全的事件配置防止影响页面布局
      element.dispatchEvent(new Event('change', { bubbles: true, cancelable: true, composed: false }));
      element.dispatchEvent(new Event('input', { bubbles: true, cancelable: true, composed: false }));
      // 触发blur事件，确保依赖blur的表单验证能够正常工作
      element.dispatchEvent(new Event('blur', { bubbles: true, cancelable: true, composed: false }));
    } else {
      // 使用模拟键盘事件填写，更接近真实用户输入
      simulateUserTyping(element, value);
      
      // 触发blur事件，确保依赖blur的表单验证能够正常工作
      setTimeout(() => {
        element.dispatchEvent(new Event('blur', { bubbles: true, cancelable: true, composed: false }));
      }, 100);
    }
    // 标记为已填写
    filledElements.add(element);
    
    // 显示成功提示
    showSuccessTooltip(element, type);
  });
  
  // 第三步：填充完成后，尝试多次自动聚焦到第一个可见的输入框
  const maxAttempts = 5; // 最大尝试次数
  let attempts = 0;

  function attemptFocus() {
    attempts++;
    console.log(`尝试聚焦，第 ${attempts} 次`);

    if (firstVisibleInput && isElementVisible(firstVisibleInput)) {
      try {
        // 先尝试常规聚焦
        firstVisibleInput.focus();
        
        // 如果常规聚焦失败，尝试使用setTimeout
        setTimeout(() => {
          try {
            firstVisibleInput.focus();
            console.log('聚焦成功(延迟):', firstVisibleInput);
          } catch (error) {
            console.log('延迟聚焦失败:', error);
          }
        }, 100);
        
        console.log('聚焦尝试完成:', firstVisibleInput);
        return true;
      } catch (error) {
        console.log('聚焦尝试失败:', error);
      }
    }

    // 如果firstVisibleInput失败，尝试找其他可见的输入框
    if (!firstVisibleInput || !isElementVisible(firstVisibleInput)) {
      const result = autoFocusToFirstField();
      if (result) return true;
    }

    // 如果还没有达到最大尝试次数，继续尝试
    if (attempts < maxAttempts) {
      setTimeout(attemptFocus, 500 * attempts); // 增加间隔时间
      return false;
    }

    console.log('已达到最大尝试次数，聚焦失败');
    return false;
  }

  // 开始第一次尝试
  attemptFocus();
}

// 将clearForm添加到window对象
window.clearForm = function() {
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    if (input.type !== 'password' && input.type !== 'hidden' && input.type !== 'submit') {
      input.value = '';
      // 使用安全的事件配置防止影响页面布局
      input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true, composed: false }));
      input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true, composed: false }));
      // 移除已填写标记
      filledElements.delete(input);
    }
  });
}

// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 自动填写函数立即执行
// 由于content script可能在页面加载后注入，所以不依赖DOMContentLoaded事件
(function initAutoFill() {
  // 如果DOM已经准备好，直接执行
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
      fillForm();
      // 不再需要额外调用autoFocusToFirstField，因为fillForm已经处理了聚焦
    }, 1000);
  } else {
    // 如果DOM还没准备好，等待加载完成
    window.addEventListener('load', () => {
      setTimeout(() => {
        fillForm();
        // 不再需要额外调用autoFocusToFirstField，因为fillForm已经处理了聚焦
      }, 1000);
    });
  }
})();

// 检查页面URL变化
let lastUrl = location.href;
function checkForUrlChanges() {
  if (location.href !== lastUrl) {
    console.log('URL变化检测: 从', lastUrl, '变为', location.href);
    lastUrl = location.href;
    // URL变化通常意味着页面内容发生了重大变化，可能是SPA路由切换或表单提交后跳转
    // 重置已填写元素集合，以便能够填写新页面上的表单
    filledElements = new WeakSet();
    // 延迟一段时间后填充表单，给新页面内容加载的时间
    setTimeout(() => {
      fillForm();
    }, 1500);
  }
}

// 使用setInterval代替递归setTimeout，避免潜在的内存泄漏
const urlCheckInterval = setInterval(checkForUrlChanges, 1000); // 每秒检查一次URL变化

// 添加页面卸载时清理interval的处理
window.addEventListener('unload', () => {
  clearInterval(urlCheckInterval);
});

// 初始执行一次
checkForUrlChanges();

// 检查是否有新的表单加载
function checkForNewForms() {
  const forms = document.querySelectorAll('form');
  let newFormFound = false;
  
  forms.forEach(form => {
    // 使用自定义属性标记已处理的表单
    if (!form.hasAttribute('data-form-fill-processed')) {
      console.log('检测到新表单:', form);
      form.setAttribute('data-form-fill-processed', 'true');
      newFormFound = true;
    }
  });
  
  if (newFormFound) {
    console.log('发现新表单，尝试填充');
    // 延迟一段时间后填充表单，给新表单内容完全加载的时间
    setTimeout(() => {
      fillForm();
    }, 1000);
  }
}

// 使用setInterval代替递归setTimeout，避免潜在的内存泄漏
const formCheckInterval = setInterval(checkForNewForms, 2000); // 每2秒检查一次新表单

// 添加页面卸载时清理interval的处理
window.addEventListener('unload', () => {
  clearInterval(formCheckInterval);
});
checkForNewForms();

// MutationObserver监听DOM变化
const observer = new MutationObserver(
  debounce((mutations) => {
    let shouldFill = false;
    let newFormElements = [];
    
    for (const mutation of mutations) {
      // 检查新添加的节点
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(node => {
          // 如果添加的是表单元素
          if (node.tagName && (
              node.tagName.toLowerCase() === 'input' || 
              node.tagName.toLowerCase() === 'select' || 
              node.tagName.toLowerCase() === 'textarea')) {
            if (!filledElements.has(node) && isElementVisible(node)) {
              newFormElements.push(node);
              shouldFill = true;
            }
          }
          // 如果添加的是包含表单元素的容器
          else if (node.querySelectorAll) {
            const formElements = node.querySelectorAll('input, select, textarea');
            if (formElements.length > 0) {
              formElements.forEach(el => {
                if (!filledElements.has(el) && isElementVisible(el)) {
                  newFormElements.push(el);
                  shouldFill = true;
                }
              });
            }
          }
        });
      }
      
      // 检查属性变化，某些表单可能通过改变style或class从隐藏变为可见
      if (mutation.type === 'attributes' && 
          (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
        const target = mutation.target;
        // 如果是表单元素且变为可见
        if ((target.tagName && (
            target.tagName.toLowerCase() === 'input' || 
            target.tagName.toLowerCase() === 'select' || 
            target.tagName.toLowerCase() === 'textarea')) && 
            isElementVisible(target) && !filledElements.has(target)) {
          newFormElements.push(target);
          shouldFill = true;
        }
        // 如果是包含表单元素的容器且变为可见
        else if (target.querySelectorAll) {
          const formElements = target.querySelectorAll('input, select, textarea');
          if (formElements.length > 0) {
            formElements.forEach(el => {
              if (!filledElements.has(el) && isElementVisible(el)) {
                newFormElements.push(el);
                shouldFill = true;
              }
            });
          }
        }
      }
    }
    
    if (shouldFill) {
      console.log('检测到DOM变化，发现新的表单元素:', newFormElements.length);
      fillForm();
    }
  }, 1000)
);

// 开始监听DOM变化
observer.observe(document.body, {
  childList: true, // 监听子节点的添加或删除
  subtree: true,   // 监听所有后代节点
  attributes: true, // 监听属性变化
  attributeFilter: ['style', 'class', 'hidden', 'display', 'visibility'] // 只监听可能影响可见性的属性
});

// 监听来自popup的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    switch (request.action) {
      case 'fillForm':
        fillForm(request.state);
        sendResponse({ success: true, message: '表单已填写完成' });
        break;
      case 'clearForm':
        clearForm();
        sendResponse({ success: true, message: '表单已清除' });
        break;
      default:
        sendResponse({ success: false, message: '未知操作' });
    }
  } catch (error) {
    sendResponse({ success: false, message: error.message });
  }
  return true;
});
