

def plant_reco(care):
    if care == 'low':
        print('aloe')
    elif care == 'meduim':
        print('pothos')
    elif care == 'high':
        print('orchid')
    else:
        print('all die')


plant_reco('low') # test case 1
plant_reco('meduim') # test case 2
plant_reco('high') # test case 3
plant_reco('nothing') # test case 4

